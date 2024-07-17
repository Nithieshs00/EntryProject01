package com.app.smlproject.evmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.smlproject.evmanager.entity.Email;
import com.app.smlproject.evmanager.repository.EmailRepository;

@RestController
@RequestMapping("/emails")
public class EmailController {

	private EmailRepository emailRepository;
	

    public EmailController(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }
    

    @GetMapping
    public List<Email> getEmails() {
        return emailRepository.findAll();
    }
}