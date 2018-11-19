package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class UserGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String name;

    @ManyToOne(targetEntity = User.class)
    private User creator;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "Groupmember",
            joinColumns = {@JoinColumn(name = "user_group_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<User> groupUsers = new HashSet<>();

}
