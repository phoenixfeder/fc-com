package server.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(unique = true)
    private String userName;
    @Column(unique = true)
    private String email;
    private String password;

    private boolean isValidated = false;
    private String checkSum;

    private String realName;
    private String interest;
    private LocalDate dateOfBirth;

   // @ManyToOne
   // @JoinColumn(name = "role_id")
    //private int roleId;

    @ManyToOne(targetEntity = Role.class)
    private Role role;

    @ManyToMany(mappedBy = "boxUsers")
    private Set<FlashCardBox> boxes = new HashSet<>();

    @ManyToMany(mappedBy = "groupUsers")
    private Set<UserGroup> groups = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "friendships",
    joinColumns =  @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<User> friends = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "friendships",
            joinColumns =  @JoinColumn(name = "friend_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> friendOf = new HashSet<>();

}
