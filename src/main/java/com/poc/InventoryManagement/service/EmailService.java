package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.config.EmailProperties;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private SendGridService sendGridService;
    private TemplateEngine templateEngine;

    private EmailProperties emailProperties;

    EmailService(SendGridService sendGridService, TemplateEngine templateEngine, EmailProperties emailProperties){
        this.sendGridService = sendGridService;
        this.templateEngine = templateEngine;
        this.emailProperties = emailProperties;
    }

    public String sendRegEmail(String email, String firstName, String regKey) {
        final Context regCtx = new Context();
        regCtx.setVariable("name", firstName);
        regCtx.setVariable("email",email);
        regCtx.setVariable("resetKey",regKey);
        regCtx.setVariable("domain",emailProperties.domain);
        final String htmlContent = this.templateEngine.process("resetPassword.html", regCtx);
        return sendGridService.sendEmail(htmlContent,email, "InventT Invite");
    }

    public String sendResetEmail(String email, String firstName, String regKey){
        final Context ctx = new Context();
        ctx.setVariable("name", firstName);
        ctx.setVariable("email",email);
        ctx.setVariable("resetKey",regKey);
        ctx.setVariable("domain",emailProperties.domain);
        final String htmlContent = this.templateEngine.process("resetPassword.html", ctx);
        return sendGridService.sendEmail(htmlContent,email, "Reset Password");
    }
}
