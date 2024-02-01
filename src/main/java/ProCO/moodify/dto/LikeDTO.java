package ProCO.moodify.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LikeDTO {
    private Long id;
    private Long likerId;
    private Long diaryId;
}
