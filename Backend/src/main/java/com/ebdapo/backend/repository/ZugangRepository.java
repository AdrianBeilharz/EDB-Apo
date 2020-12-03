package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Zugang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ZugangRepository extends JpaRepository<Zugang, String> {

    @Query(value="SELECT * FROM zugang z JOIN btm_buchung bb on z.id = bb.id JOIN benutzer b on bb.benutzer = b.id JOIN apotheke a on b.apotheke = a.id WHERE a.id = :apothekeId AND z.id = :btmbuchungId", nativeQuery = true)
    Zugang findByIds(@Param("btmbuchungId") String btmbuchungId,
                     @Param("apothekeId") String apothekeId);
}
