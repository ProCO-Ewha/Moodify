package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원 등록
    @PostMapping("/new")
    public ResponseEntity<String> create(@Valid @RequestBody MemberForm form, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Validation error", HttpStatus.BAD_REQUEST);
        }
        Member member = new Member();
        member.setName(form.getName());
        member.setPw(form.getPw());
        member.setEmail(form.getEmail());

        memberService.join(member);
        return new ResponseEntity<>("Member created successfully", HttpStatus.CREATED);
    }

    //Todo
    // 회원 정보 수정
    @PutMapping("/{memberId}/edit")
    public ResponseEntity<String> update(@PathVariable("memberId") Long memberId, @RequestBody MemberForm form) {
        Member member = memberService.findOne(memberId);
        if (member == null) {
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }

        member.setName(form.getName());
        member.setPw(form.getPw());
        member.setEmail(form.getEmail());

        memberService.saveMember(member);
        return new ResponseEntity<>("Member updated successfully", HttpStatus.OK);
    }
    //회원 정보 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<Member> getMember(@PathVariable Long memberId) {
        Member member = memberService.findOne(memberId);
        if (member == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
