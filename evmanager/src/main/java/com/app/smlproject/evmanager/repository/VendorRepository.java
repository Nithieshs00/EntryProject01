package com.app.smlproject.evmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.smlproject.evmanager.entity.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
	List<Vendor> findAllByEmailIn(List<String> emails);
}
