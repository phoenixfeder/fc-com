package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.ResetPasswordToken;
import server.entities.User;

public interface ResetPasswordTokenRepository extends CrudRepository<ResetPasswordToken, Long> {
    ResetPasswordToken findByUser(User user);
}
