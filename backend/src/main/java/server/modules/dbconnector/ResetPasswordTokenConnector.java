package server.modules.dbconnector;

import org.springframework.stereotype.Component;
import server.entities.ResetPasswordToken;
import server.entities.User;
import server.entities.repositories.ResetPasswordTokenRepository;

@Component
public class ResetPasswordTokenConnector {

    private final ResetPasswordTokenRepository resetPasswordTokenRepository;

    public ResetPasswordTokenConnector(ResetPasswordTokenRepository resetPasswordTokenRepository) {
        this.resetPasswordTokenRepository = resetPasswordTokenRepository;
    }

    public ResetPasswordToken save(ResetPasswordToken resetPasswordToken){
        return resetPasswordTokenRepository.save(resetPasswordToken);
    }

    public ResetPasswordToken getTokenByUser(User user) {
        return resetPasswordTokenRepository.findByUser(user);
    }
}
