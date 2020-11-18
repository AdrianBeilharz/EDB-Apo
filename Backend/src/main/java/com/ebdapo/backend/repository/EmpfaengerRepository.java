package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Empfaenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpfaengerRepository extends JpaRepository<Empfaenger, String > {
}
