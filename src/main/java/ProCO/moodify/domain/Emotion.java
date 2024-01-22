package ProCO.moodify.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
public class Emotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private EmotionStatus status;
    private String emotionPic;
}
