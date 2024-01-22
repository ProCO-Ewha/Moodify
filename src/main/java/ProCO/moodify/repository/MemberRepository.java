package ProCO.moodify.repository;


import ProCO.moodify.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberRepository {
    @PersistenceContext
    private EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }
    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }
    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name).getResultList();
    }
    public Member findByEmail(String email) {
        List<Member> members = em.createQuery("select m from Member m where m.email = :email", Member.class)
                .setParameter("email", email)
                .getResultList();

        return members.isEmpty() ? null : members.get(0);
    }
    public List<Member> search(String keyword){
        // JPQL을 이용한 동적 쿼리 작성
        String jpql = "select m from Member m where m.name like :keyword or m.email like :keyword";

        // JPQL을 TypedQuery로 변환
        TypedQuery<Member> query = em.createQuery(jpql, Member.class);

        // 파라미터 설정
        query.setParameter("keyword", "%" + keyword + "%");

        // 쿼리 실행 및 결과 반환
        return query.getResultList();
    }


}
