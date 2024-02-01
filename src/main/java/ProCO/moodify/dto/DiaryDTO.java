package ProCO.moodify.dto;

import ProCO.moodify.domain.AlignStatus;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.PrivacyStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Getter @Setter
public class DiaryDTO {
    private Long id;
    private Long authorId;
    private String text;
    private String pic;
    private Emotion emotion;
    private PrivacyStatus privacyStatus;
    private AlignStatus alignStatus;
    private LocalDateTime date;
    private int likeCnt;
    private String liker;
}

