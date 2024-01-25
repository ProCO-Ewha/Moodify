package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class FriendController {
    private final MemberService memberService;
    // 회원 검색
    @GetMapping("/search")
    public String searchForm(Model model) {
        model.addAttribute("keyword", ""); // 초기 검색어가 없는 경우를 처리하기 위해 빈 문자열 전달
        return "friend/search";
    }
    @PostMapping("/search")
    public String search(@RequestParam String keyword, Model model) {
        List<Member> searchResults = memberService.searchMember(keyword);
        model.addAttribute("keyword", keyword);
        model.addAttribute("searchResults", searchResults);
        return "friend/search";
    }
    //친구 추가
    @PostMapping("/addFriend")
    public String addFriend(@RequestParam Long currentUserId, @RequestParam Long friendId) {
        memberService.addFriend(currentUserId, friendId);
        return "redirect:/search"; // 검색 페이지로 리다이렉트
    }
    //친구 삭제
    @PostMapping("/deleteFriend")
    public String deleteFriend(@RequestParam Long currentUserId, @RequestParam Long friendId) {
        memberService.deleteFriend(currentUserId, friendId);
        return "redirect:/search"; // 검색 페이지로 리다이렉트
    }
}
