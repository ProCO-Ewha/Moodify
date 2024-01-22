package ProCO.moodify.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {
    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    private String email;
    private String name;
    private String pw;
    @OneToMany(mappedBy = "author")
    private List<Diary> diaries = new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "friends",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id"))
    private List<Member> friends = new ArrayList<>();

}
