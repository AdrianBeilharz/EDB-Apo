package com.ebdapo.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    @Autowired
    MyUserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/apotheke/**").hasAnyRole("BENUTZER", "ADMIN", "PRUEFER")
                .antMatchers(HttpMethod.DELETE, "/apotheke/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/apotheke/**").hasAnyRole("BENUTZER","ADMIN")
                .antMatchers("/login").hasAnyRole("BENUTZER","ADMIN", "PRUEFER")
                .antMatchers("/logout").permitAll()
                .and().httpBasic()
//                .and().formLogin().defaultSuccessUrl("/apotheke", true).permitAll()
                .and().logout().permitAll()
                .and().csrf().disable();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
//        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }



}
