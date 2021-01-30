package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.BetaeubungsmittelBuchung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface BetaeubungsmittelBuchungRepository extends JpaRepository<BetaeubungsmittelBuchung, String> {

    /**
     * Liefert die Apotheke mit der angegebenen Id zurück
     * @param apothekeId
     * @return die Apotheke oder null, falls diese nicht gefunden wurde
     */
    @Query(value = "SELECT *, 0 AS clazz_ FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN abgang a on bb.id = a.id JOIN zugang z on bb.id = z.id WHERE b.apotheke = :apothekeId", nativeQuery = true)
    Object findBtmBuchungWithApothekenId(@Param("apothekeId") String apothekeId);

    /**
     * Liefert die Apotheke mit der angegebenen Daten zurück
     * @param pruefdatum
     * @param menge
     * @param btm
     * @param benutzer
     * @return die Apotheke oder null, falls diese nicht gefunden wurde
     */
    @Query(value = "SELECT * FROM btm_buchung WHERE pruefdatum = :pruefdatum AND menge = :menge AND btm = :btm AND benutzer = :benutzer", nativeQuery = true)
    BetaeubungsmittelBuchung getBtmBuchungByValues(@Param("pruefdatum") Date pruefdatum,
                                                   @Param("menge") int menge,
                                                   @Param("btm") String btm,
                                                   @Param("benutzer") String benutzer);

    /**
     * Liefert die Apotheke mit den angegebenen Ids zurück
     * @param btmBuchungId Id der Buchung
     * @param apothekeId
     * @return die Apotheke oder null, falls diese nicht gefunden wurde
     */
    @Query(value="SELECT *,  0 AS clazz_ FROM btm_buchung bb JOIN btm b on bb.btm = b.id WHERE b.apotheke = :apothekeId AND bb.id = :btmBuchungId", nativeQuery = true)
    BetaeubungsmittelBuchung findByIds(@Param("btmBuchungId") String btmBuchungId,
                                       @Param("apothekeId") String apothekeId);


}
