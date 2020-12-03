package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BenutzerRepository extends JpaRepository<Benutzer, String> {

    @Query(value = "SELECT * FROM benutzer WHERE apotheke = ?1", nativeQuery = true)
    List<Benutzer> findBenutzerWithApothekeId(String apothekeId);

    @Query(value = "SELECT * FROM benutzer WHERE nutzername = ?1", nativeQuery = true)
    Benutzer getBenutzerByUsername(String username);

    @Query(value = "SELECT * FROM benutzer b JOIN apotheke a on b.apotheke = a.id WHERE " +
            "b.nutzername = :username AND a.id = :apothekeId", nativeQuery = true)
    Benutzer getBenutzerWithApotheke(@Param("username") String username,
                                     @Param("apothekeId") String apothekeId);


}
