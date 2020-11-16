package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Apotheke;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApothekenRepository extends JpaRepository<Apotheke, String> {

}
