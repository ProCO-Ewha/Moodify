package ProCO.moodify.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class MemberDTO {
    private Long id;
    private String email;
    private String name;
    private String pw;
    private List<Long> diaryIds;
    private List<Long> friendIds;
}
