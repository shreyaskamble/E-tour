package com.etour.main.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtRepository repository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/public/token")
    public ResponseEntity<?> generateToken(@RequestBody MyUser myUser) {
        try {
            System.out.println("Inside token method");
            System.out.println(myUser);
            
            // Validate user credentials
            boolean userExists = repository.findUser(myUser);
            if (!userExists) {
                throw new UsernameNotFoundException("Credentials don't match");
            }

            // Load user details and generate token
            customUserDetailsService.setPassword(myUser.getPassword());
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(myUser.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            System.out.println("JWT: " + token);

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (UsernameNotFoundException e) {
            // Handle specific exception for user not found
            return ResponseEntity.status(401).body("Invalid credentials");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}
