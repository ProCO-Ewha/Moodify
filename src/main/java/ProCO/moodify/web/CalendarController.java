package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class CalendarController {



    // 회원 조회
    @GetMapping(value = "/members") public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";

    }
}
