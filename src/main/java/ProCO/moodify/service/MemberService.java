package ProCO.moodify.service;

import ProCO.moodify.domain.Member;
import ProCO.moodify.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    MemberRepository memberRepository;

    //회원등록
    @Transactional
    public Long join(Member member) {
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getId();
    }
    private void validateDuplicateMember(Member member) {
        List<Member> findMembers = memberRepository.findByName(member.getName());
        if (!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //회원 수정
    @Transactional
    public Long saveMember (Member updatedMember) {
//        // 수정하려는 회원을 데이터베이스에서 조회
//        Member existingMember = memberRepository.findOne(updatedMember.getId());
//
//        // 조회된 회원이 없으면 예외 발생
//        if (existingMember == null) {
//            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
//        }
//
//        // 수정하려는 회원의 정보를 업데이트
//        existingMember.setName(updatedMember.getName());
//        existingMember.setEmail(updatedMember.getEmail());
//        existingMember.setPw(updatedMember.getPw());
//
//        memberRepository.save(existingMember);
//        return existingMember.getId();
        memberRepository.save(updatedMember);
        return updatedMember.getId();
    }

    //회원 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
    public Member findOne(Long memberId) {
        return memberRepository.findOne(memberId);
    }

    // 회원 검색: email과 name을 기준으로 보여줄 것, JPQL
    public List<Member> searchMember(String keyword) {return memberRepository.search(keyword);}

    //로그인
    public Long login(String name, String pw) {
        List<Member> members = memberRepository.findByName(name);

        if (members.isEmpty()) {
            throw new IllegalArgumentException("로그인 실패: 존재하지 않는 회원");
        }
        for (Member member : members) {
            if (member.getPw().equals(pw)) {
                // 비밀번호가 일치하면 회원 ID 반환
                return member.getId();
            }
        }
        throw new IllegalArgumentException("로그인 실패: 비밀번호가 일치하지 않습니다.");
    }


    //친구 추가
    @Transactional
    public void addFriend(Long memberId, Long friendId) {
        Member member = memberRepository.findOne(memberId);
        Member friend = memberRepository.findOne(friendId);

        if (member != null && friend != null) {

            member.getFriends().add(friend);
            friend.getFriends().add(member);
            System.out.println(member.getFriends());
            System.out.println(friend.getFriends());
            memberRepository.save(member);
            memberRepository.save(friend);
        } else {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
    }

    // 친구 삭제
    @Transactional
    public void deleteFriend(Long memberId, Long friendId) {
        Member member = memberRepository.findOne(memberId);
        Member friend = memberRepository.findOne(friendId);

        if (member != null && friend != null) {
            member.getFriends().remove(friend);
            friend.getFriends().remove(member);

            memberRepository.save(member);
            memberRepository.save(friend);
        } else {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
    }

    public List<Member> getAllFriends(Long memberId) {
        Member member = memberRepository.findOne(memberId);
        return member.getFriends();
    }
}
