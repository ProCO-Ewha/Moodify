package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.repository.MemberRepository;
import ProCO.moodify.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 등록
    @GetMapping(value = "/members/new")
    public String createForm(Model model) {
        model.addAttribute("memberForm", new MemberForm());
        return "members/createMemberForm";
    }
    @PostMapping(value = "/members/new")
    public String create(@Valid MemberForm form, BindingResult result) {
        if (result.hasErrors()) {
            return "members/createMemberForm";
        }

        Member member = new Member();
        member.setName(form.getName());
        member.setPw(form.getPw());
        member.setEmail(form.getEmail());

        memberService.join(member);
        return "redirect:/";
    }
    //Todo
    // 회원 수정: name & pw
    @GetMapping(value = "/members/{memberId}/edit")
    public String updateMemberForm(@PathVariable("memberId") Long memberId, Model model){
        Member member = (Member) memberService.findOne(memberId);
        MemberForm form = new MemberForm();

        form.setEmail(member.getEmail());
        form.setName(member.getEmail());
        form.setPw(member.getPw());

        model.addAttribute("form", form);
        return "items/updateItemForm";
    }
    @PostMapping(value = "/members/{memberId}/edit")
    public String updateItem(@ModelAttribute("form") MemberForm form) {
        Member member = new Member();
        member.setEmail(form.getEmail());
        member.setName(form.getName());
        member.setPw(form.getPw());
        memberService.saveMember(member);
        return "redirect:/items";
    }

}
