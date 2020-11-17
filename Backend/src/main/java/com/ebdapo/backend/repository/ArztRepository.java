package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Arzt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArztRepository extends JpaRepository<Arzt, String> {
}
