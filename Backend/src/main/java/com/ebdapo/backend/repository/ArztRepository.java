package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Arzt;
import com.ebdapo.backend.entity.Lieferant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface ArztRepository extends JpaRepository<Arzt, String> {

        /**
         * Sucht einen Arzt mit den angegebenen Daten und gibt diesen zurück
         * @param apothekeId
         * @param name
         * @param strasse
         * @param nummer
         * @param plz
         * @param ort
         * @return das Arzt Objekt oder null, falls dieser nicht gefunden wurde
         */
        @Query(value =
            "SELECT * " +
            "FROM arzt " +
            "WHERE name=:name AND anschrift IN (SELECT id " +
            "FROM adresse_t " +
            "WHERE strasse = :strasse AND nummer = :nummer AND ort = :ort AND plz = :plz) " +
            "AND apotheke IN (SELECT id from apotheke where apotheke.id = :apothekeId)",
            nativeQuery = true)
        Arzt findArztByValues(@Param("apothekeId") String apothekeId,
                              @Param("name") String name,
                              @Param("strasse") String strasse,
                              @Param("nummer") String nummer,
                              @Param("plz") int plz,
                              @Param("ort") String ort);


        /**
         * Sucht einen Arzt mit den angegebenen Daten und gibt diesen zurück
         * @param arztId
         * @param apothekeId
         * @return das Arzt Objekt oder null, falls dieser nicht gefunden wurde
         */
        @Query(value = "SELECT * FROM arzt a JOIN apotheke ap on a.apotheke = ap.id WHERE " +
                "a.id = :arztId AND ap.id = :apothekeId", nativeQuery = true)
        Arzt findByIds(@Param("arztId") String arztId,
                        @Param("apothekeId") String apothekeId);
}
