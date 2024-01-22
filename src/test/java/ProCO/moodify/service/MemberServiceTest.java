package ProCO.moodify.service;

import ProCO.moodify.domain.Member;
import ProCO.moodify.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
public class MemberServiceTest {
    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;

    @Test
    public void 회원가입() throws Exception {
        //Given
        Member member = new Member();
        member.setName("kim");
        //When
        Long saveId = memberService.join(member);
        //Then
        assertEquals(member, memberRepository.findOne(saveId));
    }
    @Test
    public void 중복_회원_예외() throws Exception {
        assertThrows(IllegalStateException.class, () -> {
            // given
            Member member1 = new Member();
            member1.setName("kim1");

            Member member2 = new Member();
            member2.setName("kim1");

            // when
            memberService.join(member1);
            memberService.join(member2);


            // then
            fail("예외가 발생해야 한다.");
        });
    }


}