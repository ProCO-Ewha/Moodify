package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {
    private final MemberService memberService;

    // 회원 검색
    @GetMapping("/search")
    public ResponseEntity<List<Member>> searchMembers(@RequestParam String keyword) {
        List<Member> searchResults = memberService.searchMember(keyword);
        return ResponseEntity.ok(searchResults);
    }

//    // 친구 추가
//    @PostMapping("/add")
//    public ResponseEntity<String> addFriend(@RequestParam Long currentUserId, @RequestParam Long friendId) {
//        memberService.addFriend(currentUserId, friendId);
//        String message = "친구 추가가 성공적으로 처리되었습니다.";
//        return ResponseEntity.ok().body(message);
//    }
    // 친구 추가
    @PostMapping("/add")
    public ResponseEntity<String> addFriend(@RequestBody Map<String, Long> add) {
        Long currentUserId = add.get("currentUserId");
        Long friendId = add.get("friendId");
        memberService.addFriend(currentUserId, friendId);
        String message = "친구 추가가 성공적으로 처리되었습니다.";
        return ResponseEntity.ok().body(message);
    }

    // 친구 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@RequestParam Long currentUserId, @RequestParam Long friendId) {
        memberService.deleteFriend(currentUserId, friendId);
        String message = "친구 삭제가 성공적으로 처리되었습니다.";
        return ResponseEntity.ok().body(message);
    }
}
