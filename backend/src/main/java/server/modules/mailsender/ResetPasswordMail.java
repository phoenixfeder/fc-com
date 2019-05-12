package server.modules.mailsender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import server.config.Lang;

@Component
public class ResetPasswordMail extends MailSender {

    @Autowired
    protected ResetPasswordMail(JavaMailSender mailSender) {
        super(mailSender);
        this.mailBody = Lang.mailTextPassword;
        this.subject = "Password reset";
    }
}
