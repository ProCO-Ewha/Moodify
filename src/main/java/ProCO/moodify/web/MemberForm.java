package ProCO.moodify.web;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberForm {

    @NotEmpty(message = "이메일은 필수 항목입니다")
    private String email;
    @NotEmpty(message = "비밀번호는 필수 항목입니다")
    private String pw;
    @NotEmpty(message = "닉네임은 필수 항목입니다")
    private String name;
}
