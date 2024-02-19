package ProCO.moodify.dto;

import ProCO.moodify.domain.AlignStatus;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.EmotionStatus;
import ProCO.moodify.domain.PrivacyStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Getter @Setter
public class DiaryDTO {
    private Long id;
    private Long authorId;
    private String text;
    private String pic; //삭제
    @JsonIgnore
    private EmotionStatus emotion;
    private PrivacyStatus privacyStatus;
    private AlignStatus alignStatus; //삭제
    private LocalDateTime date;
    private int likeCnt;
    private String liker;
}

