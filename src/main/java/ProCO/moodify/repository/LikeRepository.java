package ProCO.moodify.repository;

import ProCO.moodify.domain.Diary;
import ProCO.moodify.domain.Like;
import ProCO.moodify.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class LikeRepository {
    private final EntityManager em;


    public void save(Like like) {
        em.persist(like);
    }
    public Like findOne(Long id) {
        return em.find(Like.class, id);
    }

    public Like findByLikerAndDiary(Member liker, Diary diary) {
        String jpql = "select l from Like l where l.liker.id = :likerId and l.diary.id = :diaryId";
        Long likerId = liker.getId();
        Long diaryId = diary.getId();
        List<Like> likes =  em.createQuery(jpql, Like.class)
                .setParameter("likerId", likerId)
                .setParameter("diaryId", diaryId)
                .getResultList();
        return likes.isEmpty() ? null : likes.get(0);
    }

    public void delete(Like like) {
        em.remove(like);
    }


//    public List<Like> findByDiary(Diary diary) {
//
//    }
}
