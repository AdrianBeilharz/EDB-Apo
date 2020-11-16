package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BenutzerRepository extends JpaRepository<Benutzer, String> {

}
