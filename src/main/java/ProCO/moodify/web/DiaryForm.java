package ProCO.moodify.web;

import ProCO.moodify.domain.AlignStatus;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.Member;
import ProCO.moodify.domain.PrivacyStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryForm {
    private Member author;
    private String txt;
    private String pic;
    @NotNull(message = "감정을 선택하세요")
    private Emotion emotion;
    private PrivacyStatus privacyStatus;
    private AlignStatus alignStatus;
}
