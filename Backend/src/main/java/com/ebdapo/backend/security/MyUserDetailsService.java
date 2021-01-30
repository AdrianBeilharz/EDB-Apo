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

    /**
     * Sucht den Benutzer aus der Datenbank und erstellt ein UserDetails Objekt mit dem Benutzer aus der Datenbank
     * @param username
     * @return das UserDetails Objekt mit dem Benutzer
     * @throws UsernameNotFoundException wenn der Benutzer nicht in der Db gefunden werden konnte, der Client
     * kann diese Exception abfangen und den Nutzer benachrichtigen
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Benutzer benutzer = benutzerRepo.getBenutzerByUsername(username);
        if(benutzer == null){
            throw new UsernameNotFoundException("Benutzer konnte nicht gefunden werden");
        }
        return new MyUserDetails(benutzer);
    }
}
