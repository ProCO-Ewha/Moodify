package ProCO.moodify.repository;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.PrivacyStatus;
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
    public PrivacyStatus findPrivacyStatus(Long id){
        Diary diary = this.findOne(id);
        return diary.getPrivacyStatus();
    }

    public List<Diary> findDiariesByIdAndMonth(Long memberId, int year, int month) {
        return em.createQuery(
                        "SELECT d FROM Diary d WHERE d.authorId = :memberId AND YEAR(d.date) = :year AND MONTH(d.date) = :month",
                        Diary.class)
                .setParameter("memberId", memberId)
                .setParameter("year", year)
                .setParameter("month", month)
                .getResultList();
    }

    public Diary findDiariesByIdAndDate(Long memberId, int year, int month, int day) {
        String jpql = "SELECT COUNT(d) FROM Diary d " +
                "WHERE d.authorId = :memberId " +
                "AND YEAR(d.date) = :year " +
                "AND MONTH(d.date) = :month " +
                "AND DAY(d.date) = :day";
        return em.createQuery(jpql, Diary.class)
                .setParameter("memberId", memberId)
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getSingleResult();
    }
}
