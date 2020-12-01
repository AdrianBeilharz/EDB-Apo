package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Apotheke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApothekenRepository extends JpaRepository<Apotheke, String> {

    @Query(value = "SELECT * " +
            "FROM apotheke a " +
            "WHERE a.name = :name AND a.anschrift IN (SELECT id " +
            "FROM adresse_t " +
            "WHERE strasse = :strasse AND nummer = :nummer AND ort = :ort and plz = :plz)", nativeQuery = true)
    Apotheke getApothekeByValues(@Param("name") String name,
                                 @Param("strasse") String strasse,
                                 @Param("nummer") String nummer,
                                 @Param("ort") String ort,
                                 @Param("plz") int plz);
}
