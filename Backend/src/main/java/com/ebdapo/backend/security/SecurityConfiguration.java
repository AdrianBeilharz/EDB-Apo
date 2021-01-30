package com.ebdapo.backend.security;

import com.ebdapo.backend.security.auth.filters.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    @Autowired private MyUserDetailsService userDetailsService;
    @Autowired private JwtRequestFilter jwtRequestFilter;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());
    }


    /**
     * Definiert die Zugriffsberechtigungen der Endpunkte des REST-Schnittstelle
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/benutzer/*/checkUsername").permitAll()
                .antMatchers(HttpMethod.GET, "/apotheke/**").hasAnyRole("BENUTZER", "ADMIN", "PRUEFER")
                .antMatchers(HttpMethod.DELETE, "/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "​/apotheke​/*​/btmbuchung​/*").hasAnyRole("PRUEFER","ADMIN")
                .antMatchers(HttpMethod.PUT, "/apotheke/**").hasAnyRole("PRUEFER","ADMIN")
                .antMatchers(HttpMethod.POST, "/apotheke").permitAll()
                .antMatchers(HttpMethod.POST, "/apotheke/*").permitAll()
                .antMatchers("/login", "/logout").permitAll()

                //disable cross site forgery and disable cors protection
                .and().csrf().disable().cors()

                //disable springboot automatic session creation
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //we create the session by our custom jwtRequestFilter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    /**
     * Gibt an, welcher Passwort-Verschlüsselungsalgorithmus verwendet werden soll
     * @return
     */
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    /**
     * Um CORS zu aktivieren
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }



}
