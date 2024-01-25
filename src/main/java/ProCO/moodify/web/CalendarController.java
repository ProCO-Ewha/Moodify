package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.Member;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
@Controller
@RequiredArgsConstructor
public class CalendarController {
    private final MemberService memberService;
    private final DiaryService diaryService;

    // 캘린더 화면: 회원 조회 + 월별 달력 조회
    @GetMapping("/calendar")
    public String showCalendar(@RequestParam int year, @RequestParam int month, Model model) {
        Member currentMember = null; // 로그인된 사용자를 가져오는 로직이 있어야 함

        List<Member> friends = memberService.getAllFriends(currentMember.getId());
        model.addAttribute("friends", friends);

        List<Diary> monthly = diaryService.getDiariesByMonth(currentMember.getId(), year, month);
        model.addAttribute("monthly", monthly);

        List<Emotion> monthlyEmotion = new ArrayList<>();
        for (Diary diary : monthly) {
            Emotion emotion = diary.getEmotion();
            monthlyEmotion.add(emotion);
        }
        model.addAttribute("monthlyEmotion", monthlyEmotion);

        return "calendar";
    }

    // 월별 달력에서 특정 날짜를 선택했을 때 해당 날짜의 다이어리로 이동
    @GetMapping("/calendar/{year}/{month}/{day}")
    public String viewDiaryByDate(@PathVariable int year, @PathVariable int month, @PathVariable int day) {
        Member currentMember = null; // 로그인된 사용자를 가져오는 로직이 있어야 함
        Long diaryId = diaryService.getDiaryIdByDate(currentMember.getId(), year, month, day).getId();
        return "redirect:/diaries/" + diaryId + "/view"; // 해당 다이어리로 리다이렉트
    }
}
