package ProCO.moodify.web;

import ProCO.moodify.dto.DiaryDTO;
import ProCO.moodify.dto.MemberDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// CalendarResponse 클래스 정의
@Getter
@Setter
class CalendarResponse {
    private List<MemberDTO> friends;
    private List<DiaryDTO> monthly;
}