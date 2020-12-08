package com.ebdapo.backend.security.auth;

import com.ebdapo.backend.entity.Benutzer;
import com.ebdapo.backend.entity.enums.Rolle;
import com.ebdapo.backend.repository.BenutzerRepository;
import com.ebdapo.backend.security.MyUserDetails;
import com.ebdapo.backend.security.MyUserDetailsService;
import com.ebdapo.backend.security.auth.exceptions.WrongCredentialsException;
import com.ebdapo.backend.security.auth.model.AuthenticationRequest;
import com.ebdapo.backend.security.auth.model.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthenticationController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private MyUserDetailsService myUserDetailsService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private BenutzerRepository benutzerRepo;


    @PostMapping("/login")
    public ResponseEntity<?> createCustomer(@RequestBody AuthenticationRequest request) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        }catch(BadCredentialsException e) {
            throw new WrongCredentialsException("Incorrect username or password");
        }
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(request.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);
        return new ResponseEntity<>(new AuthenticationResponse(jwt, benutzerRepo.getBenutzerByUsername(request.getUsername()).getApotheke().getId()), HttpStatus.OK);
    }


    public boolean checkIfAuthorized(String username, String apothekeId ) {
        if(username == null || apothekeId == null){
            return false;
        }
        //check if the user is related to the apotheke if yes he is authorized to see the data
        Benutzer b  = benutzerRepo.getBenutzerWithApotheke(username, apothekeId);
        return b != null || isAdmin();
    }

    private boolean isAdmin() {
        MyUserDetails ud = ((MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return ud.getAuthorities().toString().contains("ROLE_"+ Rolle.ADMIN.toString());
    }

    public String getCurrentUsername() {
        try{
            return ((MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        }catch(Exception e){
            return null;
        }
    }

    public boolean checkIfAuthorizedAndSameUserOrAdmin(String username, String apothekeId, String benutzerId) {
        if(username == null || apothekeId == null){
            return false;
        }
        Benutzer b  = benutzerRepo.getBenutzerWithApotheke(username, apothekeId);
        return b.getRolle().toString().toLowerCase().equals("admin") || b.getId().equals(benutzerId);
    }
}
