package ProCO.moodify.service;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Like;
import ProCO.moodify.domain.Member;
import ProCO.moodify.repository.DiaryRepository;
import ProCO.moodify.repository.LikeRepository;
import ProCO.moodify.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LikeService {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final LikeRepository likeRepository;

    // 좋아요 등록
    @Transactional
    public Long addLike(Long likerId, Long diaryId) {
        Member liker = memberRepository.findOne(likerId);
        Diary diary = diaryRepository.findOne(diaryId);

        if (liker != null && diary != null) {
            Like like = Like.createLike(liker, diary);
            likeRepository.save(like);
            return like.getId();
        } else {
            throw new IllegalArgumentException("존재하지 않는 회원이나 다이어리입니다.");
        }
    }

    // 좋아요 취소
    @Transactional
    public void cancelLike(Long likerId, Long diaryId) {
        Member liker = memberRepository.findOne(likerId);
        Diary diary = diaryRepository.findOne(diaryId);

        if (liker != null && diary != null) {
            Like like = likeRepository.findByLikerAndDiary(liker, diary);
            if (like != null) {
                diary.getLikes().remove(like);
                likeRepository.delete(like);
            } else {
                throw new IllegalArgumentException("해당 좋아요가 존재하지 않습니다.");
            }
        } else {
            throw new IllegalArgumentException("존재하지 않는 회원이나 다이어리입니다.");
        }
    }

}
