package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface BenutzerRepository extends JpaRepository<Benutzer, String> {

    /**
     * Gibt alle Benutzer der angegebenen Apotheke zurück
     * @param apothekeId
     * @return die Benutzer
     */
    @Query(value = "SELECT * FROM benutzer WHERE apotheke = ?1", nativeQuery = true)
    List<Benutzer> findBenutzerWithApothekeId(String apothekeId);

    /**
     * Gibt den Benutzer mit dem angegebenen Benutzernamen zurück
     * @param username
     * @return den Benutzer oder null falls dieser nicht gefunden wurde
     */
    @Query(value = "SELECT * FROM benutzer WHERE nutzername = ?1", nativeQuery = true)
    Benutzer getBenutzerByUsername(String username);

    /**
     * Gibt den Benutzer mit dem angegebenen Benutzernamen, in der angegebenen Apotheke zurück
     * @param username
     * @param apothekeId
     * @return den Benutzer oder null falls dieser nicht gefunden wurde
     */
    @Query(value = "SELECT * FROM benutzer b JOIN apotheke a on b.apotheke = a.id WHERE " +
            "b.nutzername = :username AND a.id = :apothekeId", nativeQuery = true)
    Benutzer getBenutzerWithApotheke(@Param("username") String username,
                                     @Param("apothekeId") String apothekeId);


}
