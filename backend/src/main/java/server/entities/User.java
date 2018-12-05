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

    @Column(nullable = true)
    private String realName;
    @Column(nullable = true)
    private String interest;
    @Column(nullable = true)
    private LocalDate dateOfBirth;

    @ManyToOne(targetEntity = Role.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    public void insertDTOData(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
        this.password = userRequest.getPassword();
    }

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
