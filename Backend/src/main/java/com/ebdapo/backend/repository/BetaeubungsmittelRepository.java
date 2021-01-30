package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Betaeubungsmittel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface BetaeubungsmittelRepository extends JpaRepository<Betaeubungsmittel, String > {

    /**
     * Liefert eine Liste aller Betäubungsmittel mit den angegebenen Werten zurück
     * @param name
     * @param darreichungsform
     * @param einheit
     * @param apotheke
     * @return die Liste der gefundenen Betäbungsmittel
     */
    @Query(value = "SELECT * FROM btm WHERE name = :name AND darreichungsform = :darreichungsform AND einheit = :einheit AND apotheke = :apotheke", nativeQuery = true)
    List<Betaeubungsmittel> getBtmByValues(@Param("name") String name,
                                     @Param("darreichungsform") String darreichungsform,
                                     @Param("einheit") String einheit,
                                     @Param("apotheke") String apotheke);

    /**
     * Sucht ein Betäubungsmittel mit den angegeben Ids
     * @param btmId
     * @param apothekenId
     * @return das Betäubungsmittel oder null, falls diese nicht gefunden wurde
     */
    @Query(value = "SELECT * FROM btm b JOIN apotheke a on b.apotheke = a.id WHERE b.id = :btmId AND a.id = :apothekenId", nativeQuery = true)
    Betaeubungsmittel findByIds(@Param("btmId") String btmId,
                                @Param("apothekenId") String apothekenId);


    /**
     * Liefert alle Betäubungsmittel der angegebenen Apotheke zurück
     * @param apothekeId
     * @return die Liste aller Btms in der Apotheke
     */
    @Query(value = "SELECT * FROM btm WHERE apotheke = :apothekenId", nativeQuery = true)
    List<Betaeubungsmittel> getByApotheke(@Param("apothekenId") String apothekeId);
}
