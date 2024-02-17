package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Member;
import ProCO.moodify.dto.DiaryDTO;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.LikeService;
import ProCO.moodify.service.MemberService;
import ProCO.moodify.web.DiaryForm;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {
    private final DiaryService diaryService;
    private final LikeService likeService;
    private final MemberService memberService;

    // 다이어리 작성: 나중에 폼에 로그인된 회원 들어오는지 확인 필요
    @PostMapping("/new")
    public ResponseEntity<Long> write(@Valid @RequestBody DiaryForm form, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        System.out.println(form);
        Member member = memberService.findOne(form.getAuthorId());
        System.out.println(member);

        // 작성자의 ID 설정
        Long authorId = member.getId();
        System.out.println(authorId);
        // 일기 작성 처리
        Diary diary = new Diary();
        diary.setAuthor(member); // 작성자의 ID와 관계 설정
        diary.setEmotion(form.getEmotion());
        diary.setPic(form.getPic());
        diary.setText(form.getTxt());
        diary.setDate(LocalDateTime.now());
        diary.setAlignStatus(form.getAlignStatus());
        diary.setPrivacyStatus(form.getPrivacyStatus());

        Long diaryId = diaryService.write(authorId, diary);

        return new ResponseEntity<>(diaryId, HttpStatus.CREATED);
    }
    @PostMapping("/{diaryId}/edit")
    public ResponseEntity<Void> editDiary(@PathVariable Long diaryId) {
        diaryService.editPrivacy(diaryId);
        // 수정이 완료되면 해당 다이어리를 조회하는 URL로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/" + diaryId))
                .build();
    }
    @GetMapping("/{diaryId}")
    public ResponseEntity<DiaryDTO> viewDiary(@PathVariable Long diaryId) {
        DiaryDTO diaryDTO = diaryService.getDiaryDetails(diaryId);
        return new ResponseEntity<>(diaryDTO, HttpStatus.OK);
    }

    @PostMapping("/{diaryId}/like/add")
    public ResponseEntity<Void> addLike(@PathVariable Long diaryId, @RequestParam Long likerId) {
        likeService.addLike(likerId, diaryId);
        // 좋아요 추가 후 해당 다이어리를 조회하는 URL로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/diaries/" + diaryId))
                .build();
    }

    @PostMapping("/{diaryId}/like/remove")
    public ResponseEntity<Void> deleteLike(@PathVariable Long diaryId, @RequestParam  Long likerId) {
        likeService.cancelLike(likerId, diaryId);
        // 좋아요 삭제 후 해당 다이어리를 조회하는 URL로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/diaries/" + diaryId))
                .build();
    }

}
