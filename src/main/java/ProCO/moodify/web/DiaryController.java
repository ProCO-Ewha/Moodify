package ProCO.moodify.web;

import ProCO.moodify.domain.*;
import ProCO.moodify.dto.DiaryDTO;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.LikeService;
import ProCO.moodify.service.MemberService;
import ProCO.moodify.web.DiaryForm;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

import static ProCO.moodify.domain.EmotionStatus.GOOD;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {
    private final DiaryService diaryService;
    private final LikeService likeService;
    private final MemberService memberService;
//    @PostMapping("/new")
//    public ResponseEntity<Long> write(@AuthenticationPrincipal User user, @Valid @RequestBody DiaryForm form, BindingResult result) {
//        Long authorId = memberService.findByEmail(user.getUsername()).getId();
//        if (result.hasErrors()) { return new ResponseEntity<>(HttpStatus.BAD_REQUEST); }
//        // 일기 작성 처리
//        Diary diary = new Diary();
//        diary.setAuthor(memberService.findOne(authorId)); // 작성자의 ID와 관계 설정
//        diary.setEmotionStatus(form.getEmotion());
//        diary.setText(form.getTxt());
//        diary.setDate(LocalDateTime.now());
//        diary.setAlignStatus(form.getAlignStatus());
//        diary.setPrivacyStatus(form.getPrivacyStatus());
//
//        Long diaryId = diaryService.write(authorId, diary);
//        return new ResponseEntity<>(diaryId, HttpStatus.CREATED);
//    }
    //실행시킬때마다 일기 작성하기 귀찮으면 위에 post 메소드 각주처리하고 아래 활성화 해서 실행하세요 (url에만 접속해도 일기 작성됨)
    @GetMapping("/new")
    public ResponseEntity<Long> write(@AuthenticationPrincipal User user) {
        Long authorId = memberService.findByEmail(user.getUsername()).getId();
        // 일기 작성 처리
        Diary diary = new Diary();
        diary.setAuthor(memberService.findOne(authorId)); // 작성자의 ID와 관계 설정
        diary.setEmotionStatus(EmotionStatus.SURPRISED);
        diary.setText("form.getTxt()");
        diary.setDate(LocalDateTime.now());
        diary.setAlignStatus(AlignStatus.RIGHT);
        diary.setPrivacyStatus(PrivacyStatus.PRIVATE);

        Long diaryId = diaryService.write(authorId, diary);
        return new ResponseEntity<>(diaryId, HttpStatus.CREATED);
    }

    @GetMapping("/{diaryId}/edit")
    public ResponseEntity<Void> editDiary(@AuthenticationPrincipal User user, @PathVariable Long diaryId) {
        Long authorId = diaryService.getDiaryDetails(diaryId).getAuthorId();
        Long currentUserId = memberService.findByEmailDTO(user.getUsername()).getId();
        if (authorId==currentUserId){ diaryService.editPrivacy(diaryId);}
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/diaries/" + diaryId))
                .build();
    }
    @GetMapping("/{diaryId}")
    public ResponseEntity<DiaryDTO> viewDiary(@AuthenticationPrincipal User user, @PathVariable Long diaryId) {
        DiaryDTO diaryDTO = diaryService.getDiaryDetails(diaryId);
        MemberDTO memberDTO = memberService.findByEmailDTO(user.getUsername());
        System.out.println("view{diaryId}");
        if (diaryService.checkDiaryAccess( memberDTO, diaryDTO)) {
            return new ResponseEntity<>(diaryDTO, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    @PostMapping("/{diaryId}/like/add")
    public ResponseEntity<Void> addLike(@AuthenticationPrincipal User user, @PathVariable Long diaryId) {
        Long likerId = memberService.findByEmailDTO(user.getUsername()).getId();
        if (diaryService.checkDiaryAccess(memberService.findOneDTO(likerId), diaryService.getDiaryDetails(diaryId))) {
            likeService.addLike(likerId, diaryId);
        }
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/diaries/" + diaryId))
                .build();
    }
    @PostMapping("/{diaryId}/like/remove")
    public ResponseEntity<Void> deleteLike(@AuthenticationPrincipal User user, @PathVariable Long diaryId) {
        Long likerId = memberService.findByEmailDTO(user.getUsername()).getId();
        if (diaryService.checkDiaryAccess(memberService.findOneDTO(likerId), diaryService.getDiaryDetails(diaryId))) {
            likeService.cancelLike(likerId, diaryId);
        }        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/diaries/" + diaryId))
                .build();
    }

}
