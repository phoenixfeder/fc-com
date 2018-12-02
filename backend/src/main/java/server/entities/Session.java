package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Entity
@Data
public class Session {

    private static final int EXPIRATION = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String session;

    @OneToOne
    @JoinColumn(nullable = false, name="user_id")
    User user;

    private Date expiryDate;

    public Session(String session, User user) {
        this.session = session;
        this.user = user;
        this.expiryDate = createExpireDate();
    }

    private Date createExpireDate(){
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, EXPIRATION);
        return new Date(cal.getTime().getTime());
    }
}
