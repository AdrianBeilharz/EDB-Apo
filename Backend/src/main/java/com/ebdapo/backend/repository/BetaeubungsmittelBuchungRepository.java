package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.BetaeubungsmittelBuchung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface BetaeubungsmittelBuchungRepository extends JpaRepository<BetaeubungsmittelBuchung, String> {

    @Query(value = "SELECT * FROM btm_buchung bb JOIN btm b ON bb.btm = b.id WHERE b.apotheke = ?1", nativeQuery = true)
    List<BetaeubungsmittelBuchung> findBtmWithApothekenId(String apothekeId);

    @Query(value = "SELECT * FROM btm_buchung WHERE pruefdatum = ?1 AND menge = ?2 AND datum = ?3 AND btm = ?4 AND benutzer = ?5", nativeQuery = true)
    BetaeubungsmittelBuchung getBtmBuchungByValues(Date pruefdatum, int menge, Date datum, String btm, String benutzer);
}
