package ProCO.moodify.service;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Like;
import ProCO.moodify.domain.Member;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember != null) {
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
    public MemberDTO findOneDTO(Long memberId) {
        Member member = memberRepository.findOne(memberId);
        MemberDTO memberDTO = mapToDTO(member);
        return memberDTO;
    }

    // 회원 검색: email과 name을 기준으로 보여줄 것, JPQL
//    public List<Member> searchMember(String keyword) {return memberRepository.search(keyword);}

    public List<MemberDTO> searchMember(String keyword){
        List<MemberDTO> memberDTOList = new ArrayList<>();
        List<Member> memberList = memberRepository.search(keyword);
        for (Member member : memberList) {
            memberDTOList.add(mapToDTO(member));
        }
        return memberDTOList;
    }

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

    public List<MemberDTO> getAllFriends(Long memberId) {
        Member member = memberRepository.findOne(memberId);
        List <MemberDTO> memberDTOList = new ArrayList<>();
        List <Member> friends= member.getFriends();
        for (Member friend : friends) {
            memberDTOList.add(mapToDTO(friend));
        }
        return memberDTOList;
    }

    private MemberDTO mapToDTO(Member member) {
        MemberDTO dto = new MemberDTO();
        dto.setId(member.getId());
        dto.setEmail(member.getEmail());
        dto.setName(member.getName());

        List<Long> diaryIds = member.getDiaries().stream()
                .map(Diary::getId)
                .collect(Collectors.toList());
        dto.setDiaryIds(diaryIds);

        List<Long> friendIds = member.getFriends().stream()
                .map(Member::getId)
                .collect(Collectors.toList());
        dto.setFriendIds(friendIds);

        return dto;
    }
}
