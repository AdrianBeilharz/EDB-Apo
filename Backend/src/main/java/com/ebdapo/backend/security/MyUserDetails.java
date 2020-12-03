package com.ebdapo.backend.security;

import com.ebdapo.backend.entity.Benutzer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class MyUserDetails implements UserDetails {

    private Benutzer benutzer;

    public MyUserDetails(Benutzer benutzer) {
        this.benutzer = benutzer;
    }

    public MyUserDetails() {}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+this.benutzer.getRolle().toString()));
    }

    @Override
    public String getPassword() {
        return this.benutzer.getPasswort();
    }

    @Override
    public String getUsername() {
        return this.benutzer.getNutzername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.benutzer.isAktiv();
    }
}
