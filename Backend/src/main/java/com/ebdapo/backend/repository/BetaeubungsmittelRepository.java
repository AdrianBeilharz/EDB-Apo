package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Betaeubungsmittel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BetaeubungsmittelRepository extends JpaRepository<Betaeubungsmittel, String > {

    @Query(value = "SELECT * FROM btm WHERE name = :name AND darreichungsform = :darreichungsform AND einheit = :einheit AND apotheke = :apotheke", nativeQuery = true)
    List<Betaeubungsmittel> getBtmByValues(@Param("name") String name,
                                     @Param("darreichungsform") String darreichungsform,
                                     @Param("einheit") String einheit,
                                     @Param("apotheke") String apotheke);

    @Query(value = "SELECT * FROM btm b JOIN apotheke a on b.apotheke = a.id WHERE b.id = :btmId AND a.id = :apothekenId", nativeQuery = true)
    Betaeubungsmittel findByIds(@Param("apothekenId") String apothekenId, @Param("btmId") String btmId);
}
