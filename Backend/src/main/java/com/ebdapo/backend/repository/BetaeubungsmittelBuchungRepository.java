package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.BetaeubungsmittelBuchung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface BetaeubungsmittelBuchungRepository extends JpaRepository<BetaeubungsmittelBuchung, String> {

    @Query(value = "SELECT *, 0 AS clazz_ FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN abgang a on bb.id = a.id JOIN zugang z on bb.id = z.id WHERE b.apotheke = :apothekeId", nativeQuery = true)
    Object findBtmBuchungWithApothekenId(@Param("apothekeId") String apothekeId);

    @Query(value = "SELECT * FROM btm_buchung WHERE pruefdatum = :pruefdatum AND menge = :menge AND btm = :btm AND benutzer = :benutzer", nativeQuery = true)
    BetaeubungsmittelBuchung getBtmBuchungByValues(@Param("pruefdatum") Date pruefdatum,
                                                   @Param("menge") int menge,
                                                   @Param("btm") String btm,
                                                   @Param("benutzer") String benutzer);


    @Query(value="SELECT *,  0 AS clazz_ FROM btm_buchung bb JOIN btm b on bb.btm = b.id WHERE b.apotheke = :apothekeId AND bb.id = :btmBuchungId", nativeQuery = true)
    BetaeubungsmittelBuchung findByIds(@Param("btmBuchungId") String btmBuchungId,
                                       @Param("apothekeId") String apothekeId);


}
