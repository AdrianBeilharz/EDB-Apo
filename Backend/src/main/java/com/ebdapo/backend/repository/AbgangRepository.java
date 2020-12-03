package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Abgang;
import com.ebdapo.backend.entity.Zugang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AbgangRepository extends JpaRepository<Abgang, String> {

    @Query(value="SELECT * FROM abgang a JOIN btm_buchung bb on a.id = bb.id JOIN benutzer b on bb.benutzer = b.id JOIN apotheke aa on b.apotheke = aa.id WHERE aa.id = :apothekeId AND a.id = :btmbuchungId", nativeQuery = true)
    Abgang findByIds(@Param("btmbuchungId") String btmbuchungId,
                     @Param("apothekeId") String apothekeId);
}
