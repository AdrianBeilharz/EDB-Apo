package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Lieferant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LieferantRepository extends JpaRepository<Lieferant, String> {
    @Query(value = "SELECT * FROM apotheke a WHERE name = ?1 AND anschrift IN (SELECT id FROM adresse_t WHERE strasse = ?2 AND nummer = ?3 AND ort = ?4 and plz = ?5)", nativeQuery = true)
    Lieferant getLieferantByValues(String name, String strasse, String nummer, String ort, int plz);
}
