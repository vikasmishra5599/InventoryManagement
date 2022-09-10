package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.config.EmailProperties;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class SendGridService {
    private SendGrid sendGrid;
    private EmailProperties emailProperties;
    SendGridService(SendGrid sendGrid , EmailProperties emailProperties){
        this.sendGrid = sendGrid;
        this.emailProperties = emailProperties;
    }

    public String sendEmail(String message, String email, String subject) {
        System.out.println("Email props -> "+ emailProperties);
        Email from = new Email(emailProperties.fromEmail);
        String emailSubject = "Allegion InventT Invite " + subject;
        Email to = new Email(email);
        Content content = new Content("text/html",  message);

        Mail mail = new Mail(from, emailSubject, to, content);

        Request request = new Request();
        Response response = null;
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            //Email can be enabled or disabled by configuration
            if (emailProperties.enabled) {
                response = sendGrid.api(request);
            } else {
                log.info("Email Notifications were disabled via configuration " + request.getBody());
            }
        } catch (IOException ex) {
            log.error("Exception while sending email \n "+ ex);
           throw new RuntimeException("Exception while sending email");
        }
        return "email was successfully send";
    }
}
