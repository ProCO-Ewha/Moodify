package ProCO.moodify.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Diary {
    @Id @GeneratedValue
    @Column(name = "diary_id")
    private Long id;

    private Long authorId;
    private String text;
    private String pic;

    @Enumerated(EnumType.STRING)
    private EmotionStatus emotionStatus;
    @Enumerated(EnumType.STRING)
    private PrivacyStatus privacyStatus;
    @Enumerated(EnumType.STRING)
    private AlignStatus alignStatus;
    private LocalDateTime date;
    @OneToMany(mappedBy = "diary") // 추가: 좋아요 리스트
    private List<Like> likes = new ArrayList<>(); // 추가: 좋아요 리스트


    // Relationship Method
    public void setAuthor(Member member) {
        this.authorId = member.getId();
        member.getDiaries().add(this);
    }

    // Business Logic
//    public static Diary createDiary(Member author, String pic, String text, AlignStatus align, PrivacyStatus privacy, Emotion emotion ) {
//        Diary diary = new Diary();
//        diary.setAuthor(author);
//        diary.setDate(LocalDateTime.now());
//        diary.setPic(pic);
//        diary.setAlignStatus(align);
//        diary.setEmotion(emotion);
//        diary.setText(text);
//        diary.setPrivacyStatus(privacy);
//        return diary;
//    }

}