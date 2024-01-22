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
    public Long write( Long memberId,
                       String pic,
                       String text,
                       AlignStatus alignStatus,
                       PrivacyStatus privacyStatus,
                       Emotion emotion) {
        Member member = memberRepository.findOne(memberId);
        Diary diary = Diary.createDiary(member, pic, text, alignStatus, privacyStatus, emotion);
        diaryRepository.save(diary);
        return diary.getId();
    }

    // 일기 수정
    public void changePrivacy (Long diaryId, PrivacyStatus privacy ) {
        Diary diary = diaryRepository.findOne(diaryId);
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
    // 일기별 좋아요 조회: 좋아요한 사용자 조회, 일기 조회 시 같이 전달
    private List<Like> getLikesByDiary(Long diaryId) {
        Diary diary = diaryRepository.findOne(diaryId);
        if (diary != null) {
            return diary.getLikes();
        } else {
            throw new IllegalArgumentException("존재하지 않는 다이어리입니다.");
        }
    }
    public List<Member> whoLiked(Long diaryId) {
        List<Like> likes = getLikesByDiary(diaryId);
        List<Member> likers = new ArrayList<>();
        for (Like like : likes) {
            likers.add(like.getLiker());
        }
        return likers;
    }

    // 월별 조회 : 프론트엔드랑 데이터 어떻게 주고 받을지 봐야됨 ㅎㅎ 신호만 주고 받기 vs 월 정보를 아예 주고 받기
    public List<Diary> getDiariesByMonth(Long memberId, int year, int month) {
        return null;
    }


}
