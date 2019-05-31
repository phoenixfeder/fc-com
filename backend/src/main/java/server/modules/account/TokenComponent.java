package server.modules.account;

import org.springframework.stereotype.Component;
import server.entities.ResetPasswordToken;
import server.entities.User;
import server.entities.VerificationToken;
import server.exceptions.FccExcpetion;
import server.exceptions.TokenExpiredException;
import server.exceptions.TokenVerificationException;

import java.time.LocalDateTime;

@Component
public class TokenComponent {

    private boolean isTokenMatching(String token, String userToken) {
        return token.equals(userToken);
    }

    public boolean isTokenValid(User user, VerificationToken token, String requestToken) {

        if (user == null || token == null) return false;
        return isTokenMatching(requestToken, token.getToken());

    }

    public boolean isTokenValid(User user, ResetPasswordToken token, String requestToken) {

        if (user == null || token == null) return false;
        return isTokenMatching(requestToken, token.getToken());

    }

    public boolean hasTokenExpired(VerificationToken verificationToken) {
        return verificationToken.getExpiryDate().isBefore(LocalDateTime.now());
    }

    public boolean hasTokenExpired(ResetPasswordToken verificationToken) {
        return verificationToken.getExpiryDate().isBefore(LocalDateTime.now());
    }

    public static void verifyToken(User user, String requestToken, ResetPasswordToken resetPasswordToken) throws FccExcpetion {
        if (user == null || requestToken == null || requestToken.equals(resetPasswordToken.getToken()))
            throw new TokenVerificationException();
        if(resetPasswordToken.getExpiryDate().isBefore(LocalDateTime.now()))
            throw new TokenExpiredException();


    }
}
