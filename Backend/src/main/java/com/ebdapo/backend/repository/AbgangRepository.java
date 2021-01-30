package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Abgang;
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
public interface AbgangRepository extends JpaRepository<Abgang, String> {

    /**
     * Findet einen Abgang in der angegebenen Apotheke mit der BuchungsId
     * @param btmbuchungId
     * @param apothekeId
     * @return das Objekt des Abgang oder null falls dieses nicht existiert
     */
    @Query(value="SELECT a.*, bb.* FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN abgang a on bb.id = a.id JOIN benutzer b2 on bb.benutzer = b2.id JOIN apotheke a2 on b.apotheke = a2.id where a.id = :btmbuchungId and a2.id = :apothekeId", nativeQuery = true)
    Abgang findByIds(@Param("btmbuchungId") String btmbuchungId,
                     @Param("apothekeId") String apothekeId);

    /**
     * Gibt alle Abgänge der übergebenen Apotheke zurück
     * @param apothekeId
     * @return eine Liste aller Abgänge
     */
    @Query(value = "SELECT a.*, bb.* FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN abgang a on bb.id = a.id JOIN benutzer b2 on bb.benutzer = b2.id WHERE b.apotheke = :apothekeId ORDER BY b.name, bb.datum DESC", nativeQuery = true)
    List<Abgang> getBtmBuchungAbgaenge(@Param("apothekeId") String apothekeId);

    /**
     * Gibt alle Abgänge des angegebenen Betäubungsmittels in der angegebenen Apotheke zurück
     * @param apothekeId
     * @param id des Betäubungsmittels
     * @return eine Liste aller Abgänge
     */
    @Query(value = "SELECT a.*, bb.* FROM btm_buchung bb JOIN btm b ON bb.btm = b.id JOIN abgang a on bb.id = a.id JOIN benutzer b2 on bb.benutzer = b2.id WHERE b.apotheke = :apothekeId AND b.id = :btmId ORDER BY bb.datum", nativeQuery = true)
    List<Abgang> getBtmBuchungAbgaenge(@Param("apothekeId") String apothekeId, @Param("btmId") String id);
}
