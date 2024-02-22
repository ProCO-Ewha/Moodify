package ProCO.moodify.web;

import ProCO.moodify.domain.Member;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // 회원 등록
    @PostMapping("/new")
    public ResponseEntity<String> create(@Valid @RequestBody MemberForm form, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>("Validation error", HttpStatus.BAD_REQUEST);
        }
        Member member = new Member();
        member.setName(form.getName());
        member.setPw(passwordEncoder.encode(form.getPw()));
        member.setEmail(form.getEmail());

        memberService.join(member);
        return new ResponseEntity<>("Member created successfully", HttpStatus.CREATED);
    }

//    // 회원 정보 수정
//    @PutMapping("/{memberId}/edit")
//    public ResponseEntity<String> update(@PathVariable("memberId") Long memberId, @RequestBody MemberForm form) {
//        Member member = memberService.findOne(memberId);
//        if (member == null) {
//            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
//        }
//
//        member.setName(form.getName());
//        member.setPw(passwordEncoder.encode(form.getPw()));
//        member.setEmail(form.getEmail());
//
//        memberService.saveMember(member);
//        return new ResponseEntity<>("Member updated successfully", HttpStatus.OK);
//    }
//    //회원 정보 조회
//    @GetMapping("/{memberId}")
//    public ResponseEntity<MemberDTO> getMember(@PathVariable Long memberId) {
//        MemberDTO member = memberService.findOneDTO(memberId);
//        if (member == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(member, HttpStatus.OK);
//    }
    // 회원 정보 수정
//    @PutMapping("/me")
//    public ResponseEntity<String> updateCurrentUser(@AuthenticationPrincipal User user, @RequestBody MemberForm form) {
//        String loggedInUserId = user.getUsername();
//        Member member = memberService.findByEmail(loggedInUserId);
//        if (member == null) {
//            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
//        }
//        member.setName(form.getName());
//        member.setPw(passwordEncoder.encode(form.getPw()));
//        member.setEmail(member.getEmail());
//        memberService.saveMember(member);
//        return new ResponseEntity<>("Member updated successfully", HttpStatus.OK);
//    }
    @PutMapping("/edit")
    public ResponseEntity<String> updateCurrentUser(@AuthenticationPrincipal User user,  @RequestBody MemberForm form) {
        String loggedInUserEmail = user.getUsername();
        MemberDTO memberDTO = memberService.findByEmailDTO(loggedInUserEmail);
        if (memberDTO == null) {
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }
        memberDTO.setName(form.getName());
        memberDTO.setPw(passwordEncoder.encode(form.getPw()));
        memberDTO.setEmail(loggedInUserEmail);

        memberService.saveMember(memberDTO);
        return new ResponseEntity<>("Member updated successfully", HttpStatus.OK);
    }
//이거는 확인차 넣었음! 회원 수정할때는 edit 메소드만 쓰면 됨
    @GetMapping("/me")
    public ResponseEntity<MemberDTO> getCurrentUser(@AuthenticationPrincipal User user) {
        String loggedInUserId = user.getUsername();
        MemberDTO memberDTO = memberService.findByEmailDTO(loggedInUserId);
        if (memberDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(memberDTO, HttpStatus.OK);
    }
}
