package com.app.smlproject.evmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.smlproject.evmanager.entity.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

}
