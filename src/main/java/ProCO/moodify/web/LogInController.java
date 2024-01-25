package ProCO.moodify.web;

import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LogInController {
    private final MemberService memberService;
    //Todo
    @GetMapping
    public String loginForm() {
        return "login"; // 로그인 폼 페이지의 이름 (예: login.html)
    }

    @PostMapping
    public String login(@RequestParam String username, @RequestParam String password) {
        Long loginSuccess = memberService.login(username, password);

        // 로그인 성공 시 캘린더 화면으로 리다이렉트
        if (loginSuccess!=null) {
            return "redirect:/calendar"; // 캘린더 화면의 경로 (예: /calendar)
        } else {
            return "redirect:/login?error";
        }
    }
}
