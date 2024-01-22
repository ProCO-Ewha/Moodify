package ProCO.moodify.repository;

import ProCO.moodify.domain.Diary;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class DiaryRepository {
    private final EntityManager em;
    public void save(Diary diary) {
        em.persist(diary);
    }
    public Diary findOne(Long id) {
        return em.find(Diary.class, id);
    }

    // 다이어리의 emotion을 조회해서 달력으로 보여줄 findBY??? 하나 있어야됨

}
