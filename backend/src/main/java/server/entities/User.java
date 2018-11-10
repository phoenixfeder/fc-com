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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    private boolean isValidated = false;
    private String checkSum = "";

    private String realName;
    private String interest;
    private LocalDate dateOfBirth;

    @ManyToOne(targetEntity = Role.class, cascade = CascadeType.ALL)
    @JoinColumn(name="role_id")
    private Role role;

    /*@ManyToMany(mappedBy = "boxUsers")
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
    private Set<User> friendOf = new HashSet<>();*/

    public void insertDTOData(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
