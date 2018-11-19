package server.entities;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import server.entities.dto.request.UserRequest;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class User {
    @TableGenerator(name = "Id_generator", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VALUE", pkColumnValue = "Id_gen", initialValue = 100000, allocationSize = 100)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "Id_generator")
    private long id;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @ColumnDefault(value = "FALSE")
    private boolean enabled = false;
    private String checkSum = "";

    private String realName;
    private String interest;
    private LocalDate dateOfBirth;

    @ManyToOne(targetEntity = Role.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
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

    public void insertDTOData(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
    }
}
