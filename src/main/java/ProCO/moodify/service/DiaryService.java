package ProCO.moodify.service;

import ProCO.moodify.domain.*;
import ProCO.moodify.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DiaryService {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final LikeRepository likeRepository;

    // 일기 작성
    @Transactional
    public Long write( Long memberId, Diary diary) {
        Member member = memberRepository.findOne(memberId);
//        Diary diary = Diary.createDiary(member, pic, text, alignStatus, privacyStatus, emotion);
        diaryRepository.save(diary);
        return diary.getId();
    }
    // 일기 수정
    public void editPrivacy (Long diaryId) {
        Diary diary = diaryRepository.findOne(diaryId);
        PrivacyStatus privacy = diary.getPrivacyStatus();
        if (privacy == PrivacyStatus.PRIVATE) {
            diary.setPrivacyStatus(PrivacyStatus.PUBLIC);
        }
        else{
            diary.setPrivacyStatus(PrivacyStatus.PRIVATE);
        }
        diaryRepository.save(diary);
    }
    // 일기 조회
    public Diary getDiaryDetails(Long diaryId) {
        return diaryRepository.findOne(diaryId);
    }
    // 일기별 좋아요 조회: 좋아요한 사용자 + 좋아요 수
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
        return likers.get(likers.size()-1).getName();
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
    public List<Diary> getDiariesByMonth(Long memberId, int year, int month) {
        return diaryRepository.findDiariesByIdAndMonth(memberId, year, month);
    }
    //날짜에 의한 조회 -> 이후 다이어리 조회 예정
    public Diary getDiaryIdByDate(Long memberId, int year, int month, int day) {
        return diaryRepository.findDiariesByIdAndDate(memberId, year, month, day);
    }
}
