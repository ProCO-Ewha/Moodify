package ProCO.moodify.web;

import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login-process")
public class LogInController {
    private final MemberService memberService;
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Map<String, String> login) {
        String email = login.get("email");
        String password = login.get("pw");

        System.out.println(email);
        System.out.println(password);


        Long loginSuccess = memberService.login(email, password);

        if (loginSuccess != null) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
        }
    }

}
