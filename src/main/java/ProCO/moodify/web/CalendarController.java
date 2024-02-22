package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.Member;
import ProCO.moodify.domain.PrivacyStatus;
import ProCO.moodify.dto.DiaryDTO;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.service.DiaryService;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final MemberService memberService;
    private final DiaryService diaryService;
    @GetMapping("/{username}")
    public ResponseEntity<CalendarResponse> showCalendar(@AuthenticationPrincipal User user, @RequestParam int year, @RequestParam int month, @PathVariable String username) {
        // 친구 목록은 현재 사용자의 친구, 달력은 주소를 따름
        MemberDTO currentMember = memberService.findByEmailDTO(user.getUsername());
        List<MemberDTO> friends = memberService.getAllFriends(currentMember.getId());
        MemberDTO urlMember = memberService.findByEmailDTO(username);
        CalendarResponse response = new CalendarResponse();
        response.setFriends(friends);
        // 현재 사용자와 URL에 작성된 사용자가 동일하거나 서로 친구인지 확인
        if (currentMember.getId().equals(urlMember.getId()) || memberService.areFriends(currentMember.getId(), urlMember.getId())) {
            List<DiaryDTO> monthly = diaryService.getDiariesByMonth(urlMember.getId(), currentMember.getId(), year, month);
            response.setMonthly(monthly);
        }
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .body(response);
    }
    @GetMapping("/redirect-calendar")
    public RedirectView redirectCalendar(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        LocalDate currentDate = LocalDate.now();
        int year = currentDate.getYear();
        int month = currentDate.getMonthValue();
        String redirectUrl = String.format("/calendar/%s?year=%d&month=%d", username, year, month);
        return new RedirectView(redirectUrl);
    }
    @GetMapping("/{username}/{year}/{month}/{day}")
    public ResponseEntity<Long> viewDiaryByDate(@AuthenticationPrincipal User user, @PathVariable String username, @PathVariable int year, @PathVariable int month, @PathVariable int day) {
        Long currentMemberId = memberService.findByEmailDTO(user.getUsername()).getId();
        Long diaryId = diaryService.getDiaryIdByDate(currentMemberId, year, month, day).getId();
        return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", "/diaries/" + diaryId) // 해당 다이어리로 리다이렉트
                    .header("Access-Control-Allow-Origin", "*") // CORS 설정
                    .body(diaryId);
//        DiaryDTO diaryDTO = diaryService.getDiaryDetails(diaryId);
//        if (diaryDTO.getPrivacyStatus() == PrivacyStatus.PUBLIC){
//            return ResponseEntity.status(HttpStatus.FOUND)
//                    .header("Location", "/diaries/" + diaryId) // 해당 다이어리로 리다이렉트
//                    .header("Access-Control-Allow-Origin", "*") // CORS 설정
//                    .body(diaryId);
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
    }
}
