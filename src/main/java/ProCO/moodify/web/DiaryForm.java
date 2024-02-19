package ProCO.moodify.web;

import ProCO.moodify.domain.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryForm {
    private Long authorId;
    private String txt;
    private String pic;
    @NotNull(message = "감정을 선택하세요")
    private EmotionStatus emotion;
    private PrivacyStatus privacyStatus;
    private AlignStatus alignStatus;
}
