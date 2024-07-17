package com.app.smlproject.evmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.smlproject.evmanager.entity.Email;
import com.app.smlproject.evmanager.entity.Vendor;
import com.app.smlproject.evmanager.repository.EmailRepository;
import com.app.smlproject.evmanager.repository.VendorRepository;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private EmailRepository emailRepository;

    @PostMapping
    public Vendor createVendor(@RequestBody Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Long id) {
        return vendorRepository.findById(id)
                .map(vendor -> ResponseEntity.ok().body(vendor))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable Long id, @RequestBody Vendor vendorDetails) {
        return vendorRepository.findById(id)
                .map(vendor -> {
                    vendor.setName(vendorDetails.getName());
                    vendor.setEmail(vendorDetails.getEmail());
                    vendor.setUpi(vendorDetails.getUpi());
                    Vendor updatedVendor = vendorRepository.save(vendor);
                    return ResponseEntity.ok().body(updatedVendor);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVendor(@PathVariable Long id) {
        return vendorRepository.findById(id)
                .map(vendor -> {
                    vendorRepository.delete(vendor);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/sendEmails")
    public ResponseEntity<?> sendEmailsToVendors(@RequestBody List<String> vendorEmails) {
    	
        List<Vendor> vendors = vendorRepository.findAllByEmailIn(vendorEmails);
        vendors.forEach(vendor -> {
            Email emailContent = new Email();
            emailContent.setEmailContent("Sending payments to vendor " + vendor.getName() + " at upi" + vendor.getUpi());
            emailContent.setVendorName(vendor.getName());
            emailContent.setVendorEmail(vendor.getEmail());
            emailRepository.save(emailContent);    // the mail is saved in the emailRepo
        });
        return ResponseEntity.ok("Emails sent to vendors and saved to repository");
    }
}