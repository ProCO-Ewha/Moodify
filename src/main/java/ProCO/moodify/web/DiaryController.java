package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Member;
import ProCO.moodify.repository.DiaryRepository;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.LikeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    private final LikeService likeService;

    //일기 작성
    @GetMapping(value = "/write")
    public String writeForm(Model model) {
        model.addAttribute("diaryForm", new DiaryForm());
        return "write/diaryForm";
    }
    @PostMapping(value = "/diaries/new")
    public String write(@Valid DiaryForm form, BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "members/diaryForm";
        }
        // Spring Security를 이용하여 현재 인증된 사용자의 정보를 가져옴
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUsername = authentication.getName(); // 현재 로그인된 사용자의 username을 가져옴
//
//        // 현재 로그인된 사용자의 username 또는 ID를 사용하여 해당 회원의 정보를 가져옴
//        Member currentMember = memberService.findByUsername(currentUsername);
//        Long memberId = currentMember.getId();

        Member currentMember = null;
        Long memberId = 01L;  // 위 코드가 있으면 삭제 해도 됨

        Diary diary = new Diary();
        diary.setAuthor(currentMember); // 현재 로그인된 회원을 작성자로 설정
        diary.setEmotion(form.getEmotion());
        diary.setPic(form.getPic());
        diary.setText(form.getText());
        diary.setDate(LocalDateTime.now());
        diary.setAlignStatus(form.getAlignStatus());
        diary.setPrivacyStatus(form.getPrivacyStatus());

        Long diaryId = diaryService.write(memberId, diary);

        // 생성된 다이어리의 아이디를 사용하여 리다이렉트 주소 생성
        redirectAttributes.addAttribute("diaryId", diaryId);
        return "redirect:/diaries/{diaryId}/view";
    }

    @GetMapping("/diaries/{diaryId}/view")
    public String viewDiary(@PathVariable Long diaryId, Model model) {
        Diary diary = diaryService.getDiaryDetails(diaryId);
        int likeCount = diaryService.getLikeCount(diaryId);
        String whoLiked = diaryService.whoLiked(diaryId);

        model.addAttribute("diary", diary);
        model.addAttribute("likeCount", likeCount);
        model.addAttribute("whoLiked", whoLiked);
        return "diary/view"; // 일기 조회 페이지의 이름
    }

    // 일기 수정: 여기서도 회원 권한 수정 필요
    @PostMapping("/diaries/{diaryId}/edit")
    public String editDiary(@PathVariable Long diaryId, @RequestParam String newContent) {
        diaryService.editPrivacy(diaryId);
        return "redirect:/diary/{diaryId}/view"; // 수정된 일기를 보여주는 페이지로 리다이렉트
    }
    // 일기 좋아요 등록
    @PostMapping("/diaries/{diaryId}/like/add")
    public String addLike(@PathVariable Long diaryId) {
        Diary diary = diaryService.getDiaryDetails(diaryId);
        Member liker = null; //현재 로그인한 회원 정보 받아 와야 함
        likeService.addLike(liker.getId(), diaryId);
        return "redirect:/diary/{diaryId}/view"; // 일기 조회 페이지로 리다이렉트
    }
    // 일기 좋아요 취소
    @PostMapping("/diaries/{diaryId}/like/remove")
    public String deleteLike(@PathVariable Long deleteId) {
        Diary diary = diaryService.getDiaryDetails(deleteId);
        Member liker = null; //현재 로그인한 회원 정보 받아 와야 함
        likeService.cancelLike(liker.getId(), deleteId);
        return "redirect:/diary/{diaryId}/view"; // 일기 조회 페이지로 리다이렉트
    }
}
