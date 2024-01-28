package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.Member;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final MemberService memberService;
    private final DiaryService diaryService;

    @GetMapping
    public ResponseEntity<List<Member>> showCalendar(@RequestParam int year, @RequestParam int month) {
        Member currentMember = null; // 로그인된 사용자를 가져오는 로직이 있어야 함

        List<Member> friends = memberService.getAllFriends(currentMember.getId());
        List<Diary> monthly = diaryService.getDiariesByMonth(currentMember.getId(), year, month);
        List<Emotion> monthlyEmotion = new ArrayList<>();
        for (Diary diary : monthly) {
            Emotion emotion = diary.getEmotion();
            monthlyEmotion.add(emotion);
        }

        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*") // CORS 설정
                .body(friends);
    }

    @GetMapping("/{year}/{month}/{day}")
    public ResponseEntity<Long> viewDiaryByDate(@PathVariable int year, @PathVariable int month, @PathVariable int day) {
        Member currentMember = null; // 로그인된 사용자를 가져오는 로직이 있어야 함
        Long diaryId = diaryService.getDiaryIdByDate(currentMember.getId(), year, month, day).getId();
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", "/api/diaries/" + diaryId + "/view") // 해당 다이어리로 리다이렉트
                .header("Access-Control-Allow-Origin", "*") // CORS 설정
                .body(diaryId);
    }
}