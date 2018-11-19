package server.services.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import server.config.Lang;

@Component
public class MailSending {

    private final JavaMailSender mailSender;

    @Autowired
    public MailSending(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private String getMailText(String username, String id, String token) {
        String text = Lang.mailText;
        text = text.replace("##username##", username);
        text = text.replace("##userid##", id);
        text = text.replace("##token##", token);
        return text;
    }

    public void send(String mailAddress, String username, String id, String token) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(mailAddress);
        email.setSubject("Registration Confirmation");
        String text = getMailText(username, id, token);
        email.setText(text);
        mailSender.send(email);
    }
}
