package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Apotheke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface ApothekenRepository extends JpaRepository<Apotheke, String> {

    /**
     * Liefert eine Apotheke mit den angegebenen Parametern zurück
     * @param name
     * @param strasse
     * @param nummer
     * @param ort
     * @param plz
     * @return das Objekt der Apotheke, oder null falls diese nicht existiert
     */
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
