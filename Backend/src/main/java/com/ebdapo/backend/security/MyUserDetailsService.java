package com.ebdapo.backend.security;

import com.ebdapo.backend.entity.Benutzer;
import com.ebdapo.backend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    public BenutzerRepository benutzerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Benutzer benutzer = benutzerRepo.getBenutzerByUsername(username);
        if(benutzer == null){
            throw new UsernameNotFoundException("Benutzer konnte nicht gefunden werden");
        }
        return new MyUserDetails(benutzer);
    }
}
