package ProCO.moodify.web;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Member;
import ProCO.moodify.service.DiaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    @GetMapping(value = "/write")
    public String writeForm(Model model) {
        model.addAttribute("diaryForm", new DiaryForm());
        return "write/writeForm";
    }
    @PostMapping(value = "/members/new")
    public String write(@Valid DiaryForm form, BindingResult result) {
        if (result.hasErrors()) {
            return "members/createMemberForm";
        }

        Diary diary = new Diary();
        diary.setAuthor(form.getAuthor());
        diary.setEmotion(form.getEmotion());
        diary.setPic(form.getPic());
        diary.setText(form.getText());
        diary.setAlignStatus(form.getAlignStatus());
        diary.setPrivacyStatus(form.getPrivacyStatus());

        diaryService.write(diary);
        return "redirect:/";
    }

}
