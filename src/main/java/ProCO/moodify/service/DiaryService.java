package ProCO.moodify.service;

import ProCO.moodify.domain.*;
import ProCO.moodify.dto.DiaryDTO;
import ProCO.moodify.dto.MemberDTO;
import ProCO.moodify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryService {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final LikeRepository likeRepository;
    private final MemberService memberService;

    // 일기 작성
    @Transactional
    public Long write(Long memberId, Diary diary) {
//        Member member = memberRepository.findOne(memberId);
//        Diary diary = Diary.createDiary(member, pic, text, alignStatus, privacyStatus, emotion);
        diaryRepository.save(diary);
        return diary.getId();
    }
    // 일기 수정
    @Transactional
    public void editPrivacy (Long diaryId) {
        System.out.println("edit");
        Diary diary = diaryRepository.findOne(diaryId);
        PrivacyStatus privacy = diary.getPrivacyStatus();
        if (privacy == PrivacyStatus.PRIVATE) {
            System.out.println("public");
            diary.setPrivacyStatus(PrivacyStatus.PUBLIC);
        }
        else{
            diary.setPrivacyStatus(PrivacyStatus.PRIVATE);
        }
        diaryRepository.save(diary);
    }
    // 일기 조회
    public DiaryDTO getDiaryDetails(Long diaryId) {
        Diary diary = diaryRepository.findOne(diaryId);
        DiaryDTO diaryDTO = mapToDTO(diary);
        return diaryDTO;
    }
    // 일기별 좋아요 조회: 좋아요한 사용자 + 좋아요 수, 이게 왜 필요한건지 모르겟음... ㅎ
    private List<Like> getLikesByDiary(Long diaryId) {
        Diary diary = diaryRepository.findOne(diaryId);
        if (diary != null) {
            return diary.getLikes();
        } else {
            throw new IllegalArgumentException("존재하지 않는 다이어리입니다.");
        }
    }
    public String whoLiked(Long diaryId) {
        List<Like> likes = getLikesByDiary(diaryId);
        List<Member> likers = new ArrayList<>();
        for (Like like : likes) {
            likers.add(like.getLiker());
        }
        if (likers.size()!=0){
            return likers.get(likers.size()-1).getName();
        }
        else {
            return null;
        }

    }
    public int getLikeCount(Long diaryId) {
        List<Like> likes = getLikesByDiary(diaryId);
        List<Member> likers = new ArrayList<>();
        for (Like like : likes) {
            likers.add(like.getLiker());
        }
        return likers.size();
    }
    //월별 조회
    public List<DiaryDTO> getDiariesByMonth(Long currentUserId, Long urlId, int year, int month) {
        List<Diary> diaryList = diaryRepository.findDiariesByIdAndMonth(urlId, year, month);
        List<DiaryDTO> diaryDTOList = new ArrayList<>();

        for ( Diary diary : diaryList){
            diaryDTOList.add(mapToDTO(diary));
        }
        diaryDTOList.sort(Comparator.comparing(DiaryDTO::getDate)); //날짜별 정렬
        if (currentUserId != urlId){
            for (DiaryDTO diaryDTO : diaryDTOList){
                if (diaryDTO.getPrivacyStatus()==PrivacyStatus.PRIVATE){ diaryDTOList.remove(diaryDTO);}
            }
        }
        return diaryDTOList;
    }

    //날짜에 의한 조회 -> 이후 다이어리 조회 예정
    public Diary getDiaryIdByDate(Long memberId, int year, int month, int day) {
        return diaryRepository.findDiariesByIdAndDate(memberId, year, month, day);
    }

    public boolean checkDiaryAccess(MemberDTO memberDTO, DiaryDTO diaryDTO) {
        // 다이어리 접근권한 확인
        if (diaryDTO.getPrivacyStatus() == PrivacyStatus.PRIVATE) {
            // 다이어리가 private인 경우, 작성자와 현재 사용자가 동일한지 확인 - 동일하면 true 반환
            return diaryDTO.getAuthorId().equals(memberDTO.getId());
        } else {
            // 다이어리가 private가 아닌 경우, 현재 사용자와 작성자가 친구인지 확인 - 친구이면 true 반환
            return memberService.areFriends(memberDTO.getId(), diaryDTO.getAuthorId());
        }
    }


    private DiaryDTO mapToDTO(Diary diary) {
        DiaryDTO diaryDTO =  new DiaryDTO();
        diaryDTO.setId(diary.getId());
        diaryDTO.setAuthorId(diary.getAuthorId());
        diaryDTO.setText(diary.getText());
        diaryDTO.setPic(diary.getPic());
        diaryDTO.setEmotion(diary.getEmotionStatus());
        diaryDTO.setPrivacyStatus(diary.getPrivacyStatus());
        diaryDTO.setAlignStatus(diary.getAlignStatus());
        diaryDTO.setDate(diary.getDate());
        diaryDTO.setLikeCnt(getLikeCount(diary.getId()));
        diaryDTO.setLiker(whoLiked(diary.getId()));
        return diaryDTO;
    }
}
