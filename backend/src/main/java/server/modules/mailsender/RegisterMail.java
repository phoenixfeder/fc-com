package server.modules.mailsender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import server.config.Lang;

@Component
class RegisterMail extends MailSender {

    @Autowired
    protected RegisterMail(JavaMailSender mailSender) {
        super(mailSender);
        this.mailBody = Lang.mailText;
        this.subject = "Registration Confirmation";
    }
}
