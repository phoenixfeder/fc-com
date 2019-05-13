package server.entities;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import server.entities.dto.request.UserRequest;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class User {
    @TableGenerator(name = "userGen", table = "ID_GEN", pkColumnName = "GEN_KEY", valueColumnName = "GEN_VALUE", pkColumnValue = "USER_ID", initialValue = 100000, allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "userGen")
    private long id;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @ColumnDefault(value = "FALSE")
    private boolean enabled = false;

    @ColumnDefault(value = "FALSE")
    private boolean closedAccount = false;

    @Column(nullable = true)
    private String realName;
    @Column(nullable = true)
    private String interest;
    @Column(nullable = true)
    private LocalDate dateOfBirth;

    @ManyToOne(targetEntity = Role.class)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "box_id", referencedColumnName = "id")
    )
    private Set<FlashCardBox> viewableBoxes;

    public void insertDTOData(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
    }

    @Deprecated
    public void updateNonSensitiveData(UserRequest userRequest) {
        if (userRequest.getDateOfBirth() != null) {
            this.dateOfBirth = userRequest.getDateOfBirth();
        }
        if (userRequest.getRealName() != null) {
            this.realName = userRequest.getRealName();
        }
        if (userRequest.getInterest() != null) {
            this.interest = userRequest.getInterest();
        }
    }

}
