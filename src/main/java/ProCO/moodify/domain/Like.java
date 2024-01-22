package ProCO.moodify.domain;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "likes")
@Getter @Setter
public class Like {
    @Id @GeneratedValue
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "liker_id")
    private Member liker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    // Relationship Method
    public void setDiaryAndLiker (Member liker, Diary diary) {
        this.diary = diary;
        this.liker = liker;
        diary.getLikes().add(this);
    }

    // 좋아요 생성
    public static Like createLike (Member liker, Diary diary ) {
        Like like = new Like();
        like.setDiaryAndLiker(liker, diary);
        return like;
    }
}
