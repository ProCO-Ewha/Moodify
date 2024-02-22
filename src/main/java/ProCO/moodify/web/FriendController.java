package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {
    private final MemberService memberService;
    @GetMapping("/search")
    public ResponseEntity<List<MemberDTO>> searchMembers(@RequestParam String keyword) {
        List<MemberDTO> searchResults = memberService.searchMember(keyword);
        return ResponseEntity.ok(searchResults);
    }
    @PostMapping("/add")
    public ResponseEntity<String> addFriend(@AuthenticationPrincipal User user, @RequestBody Long addId) {
        String currentUserEmail = user.getUsername();
        Long currentUserId = memberService.findByEmail(currentUserEmail).getId();

        memberService.addFriend(currentUserId, addId);
        String message = "친구 추가가 성공적으로 처리되었습니다.";
        return ResponseEntity.ok().body(message);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@AuthenticationPrincipal User user, @RequestBody Long deleteId) {
        String currentUserEmail = user.getUsername();
        Long currentUserId = memberService.findByEmail(currentUserEmail).getId();

        memberService.deleteFriend(currentUserId, deleteId);
        String message = "친구 삭제가 성공적으로 처리되었습니다.";
        return ResponseEntity.ok().body(message);
    }
}
