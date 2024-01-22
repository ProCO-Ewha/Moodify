package ProCO.moodify.web;

import ProCO.moodify.domain.AlignStatus;
import ProCO.moodify.domain.Emotion;
import ProCO.moodify.domain.Member;
import ProCO.moodify.domain.PrivacyStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
public class DiaryForm {
    private Member author;
    private String text;
    private String pic;
    @NotEmpty(message = "감정을 선택하세요")
    private Emotion emotion;
    private PrivacyStatus privacyStatus;
    private AlignStatus alignStatus;
}
