package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Lieferant;
import com.ebdapo.backend.entity.apidetails.LieferantAPIDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LieferantRepository extends JpaRepository<Lieferant, String> {

    @Query(value =
            "SELECT * " +
            "FROM lieferant " +
            "WHERE name=:name AND anschrift IN (SELECT id " +
            "FROM adresse_t " +
            "WHERE strasse = :strasse AND nummer = :nummer AND ort = :ort AND plz = :plz) " +
            "AND apotheke IN (SELECT id from apotheke where apotheke.id = :apothekeId)",
            nativeQuery = true)
    Lieferant findLieferantByValues(@Param("apothekeId") String apothekeId,
                                    @Param("name") String name,
                                    @Param("strasse") String strasse,
                                    @Param("nummer") String nummer,
                                    @Param("plz") int plz,
                                    @Param("ort") String ort);


    @Query(value = "SELECT * FROM lieferant l JOIN apotheke a on l.apotheke = a.id WHERE " +
            "l.id = :lieferantId AND a.id = :apothekeId", nativeQuery = true)
    Lieferant findByIds(@Param("lieferantId") String lieferantId,
                        @Param("apothekeId") String apothekeId);
}
