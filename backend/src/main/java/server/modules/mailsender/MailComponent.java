package server.modules.mailsender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MailComponent extends MailSender {
    public enum Purpose{
        REGISTER, RESETPASSWORD
    }

    private final RegisterMail registerMail;
    private final ResetPasswordMail resetPasswordMail;

    @Autowired
    public MailComponent(RegisterMail registerMail, ResetPasswordMail resetPasswordMail) {
        super(null);
        this.registerMail = registerMail;
        this.resetPasswordMail = resetPasswordMail;
    }

    @Override
    public void send(String mailTo, String username, String id, String token, Purpose purpose){
        switch (purpose){
            case REGISTER:
                registerMail.send(mailTo, username, id, token, purpose);
                break;
            case RESETPASSWORD:
                resetPasswordMail.send(mailTo, username, id, token, purpose);
        }
    }
}
