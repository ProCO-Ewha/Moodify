package ProCO.moodify.config;

import ProCO.moodify.domain.Member;
import ProCO.moodify.service.MemberService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MyUserDetailsService implements UserDetailsService {
    private final MemberService memberService;

    public MyUserDetailsService(MemberService memberService) {
        this.memberService = memberService;
    }
    @Override
    public UserDetails loadUserByUsername(String insertedUserId) throws UsernameNotFoundException {
        Optional<Member> findOne = memberService.findByEmail(insertedUserId);
        Member member = findOne.orElseThrow(() -> new UsernameNotFoundException("없는 회원입니다 ㅠ"));

        return User.builder()
                .username(member.getEmail())
                .password(member.getPw())
                .build();
    }
}