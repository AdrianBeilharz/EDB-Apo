package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Zugang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface ZugangRepository extends JpaRepository<Zugang, String> {

    /**
     * Sucht einen Zugang mit der angegebenen Id in der angegebenen Apotheke
     * @param btmbuchungId
     * @param apothekeId
     * @return den Zugang oder null, falls dieser nicht gefunden wurde
     */
    @Query(value="SELECT * FROM zugang z JOIN btm_buchung bb on z.id = bb.id JOIN benutzer b on bb.benutzer = b.id JOIN apotheke a on b.apotheke = a.id WHERE a.id = :apothekeId AND bb.id = :btmbuchungId", nativeQuery = true)
    Zugang findByIds(@Param("btmbuchungId") String btmbuchungId,
                     @Param("apothekeId") String apothekeId);

    /**
     * Liefert eine Liste aller Zugänge in der angegebenen Apotheke
     * @param apothekeId
     * @return
     */
    @Query(value = "SELECT z.*, bb.* FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN zugang z on bb.id = z.id JOIN benutzer b2 on bb.benutzer = b2.id WHERE b.apotheke = :apothekeId ORDER BY b.name, bb.datum DESC", nativeQuery = true)
    List<Zugang> getBtmBuchungZugaenge(@Param("apothekeId") String apothekeId);

    /**
     * Liefert eine Liste aller Zugänge des angegebenen Betäubungsmittels in der angegebenen Apotheke
     * @param apothekeId
     * @param id
     * @return
     */
    @Query(value = "SELECT z.*, bb.* FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN zugang z on bb.id = z.id JOIN benutzer b2 on bb.benutzer = b2.id WHERE b.apotheke = :apothekeId AND b.id = :btmId ORDER BY bb.datum", nativeQuery = true)
    List<Zugang> getBtmBuchungZugaenge(@Param("apothekeId") String apothekeId, @Param("btmId") String id);
}
