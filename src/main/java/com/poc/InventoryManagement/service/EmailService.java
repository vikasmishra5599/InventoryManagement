package com.poc.InventoryManagement.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;

@Service
public class EmailService {

    private SendGridService sendGridService;
    private TemplateEngine templateEngine;


    EmailService(SendGridService sendGridService, TemplateEngine templateEngine){
        this.sendGridService = sendGridService;
        this.templateEngine = templateEngine;
    }

    public String sendRegEmail(String email, String firstName, String regKey) {
        final Context regCtx = new Context();
        regCtx.setVariable("name", firstName);
        regCtx.setVariable("email",email);
        regCtx.setVariable("resetKey",regKey);
        final String htmlContent = this.templateEngine.process("resetPassword.html", regCtx);
        return sendGridService.sendEmail(htmlContent,email, "InventT Invite");
    }

    public String sendResetEmail(String email, String firstName, String regKey){
        final Context ctx = new Context();
        ctx.setVariable("name", firstName);
        ctx.setVariable("email",email);
        ctx.setVariable("resetKey",regKey);
        final String htmlContent = this.templateEngine.process("resetPassword.html", ctx);
        return sendGridService.sendEmail(htmlContent,email, "Reset Password");
    }
}
