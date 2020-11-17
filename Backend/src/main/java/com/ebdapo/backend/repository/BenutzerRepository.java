package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BenutzerRepository extends JpaRepository<Benutzer, String> {

    @Query(value = "SELECT * FROM benutzer b WHERE b.apotheke = ?1", nativeQuery = true)
    List<Benutzer> findBenutzerWithApothekeId(String apothekeId);
}
