package ProCO.moodify.web;

import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LogInController {
    private final MemberService memberService;
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Map<String, String> login) {
        String username = login.get("name");
        String password = login.get("pw");

        Long loginSuccess = memberService.login(username, password);

        if (loginSuccess != null) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
        }
    }

}
