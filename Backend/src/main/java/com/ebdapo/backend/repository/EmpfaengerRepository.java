package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Empfaenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * With this class, data can be read and written into the database
 * Custom queries can be defined to fetch or update data from the database
 */
public interface EmpfaengerRepository extends JpaRepository<Empfaenger, String > {


    /**
     * Sucht einen Empfänger mit den angegebenen Werten
     * @param apothekeId
     * @param name
     * @param vorname
     * @param strasse
     * @param nummer
     * @param plz
     * @param ort
     * @return den Empfänger oder null, falls dieser nicht gefunden werden konnte
     */
    @Query(value="SELECT * " +
            "FROM empfaenger e JOIN adresse_t a on e.anschrift = a.id " +
            "WHERE e.name = :name AND e.vorname = :vorname AND " +
            "a.strasse = :strasse AND a.nummer = :nummer AND" +
            " a.plz = :plz AND a.ort = :ort AND e.apotheke IN (" +
                "SELECT a2.id " +
                "FROM apotheke a2 " +
                "WHERE a2.id = :apothekeId)", nativeQuery = true)
    Empfaenger findEmpfaengerByValues(@Param("apothekeId") String apothekeId,
                                      @Param("name") String name,
                                      @Param("vorname") String vorname,
                                      @Param("strasse") String strasse,
                                      @Param("nummer") String nummer,
                                      @Param("plz") int plz,
                                      @Param("ort") String ort);

    /**
     * Sucht einen Empfänger mit den angegebenen Ids
     * @param empfaengerId
     * @param apothekeId
     * @return den Empfänger oder null, falls dieser nicht gefunden werden konnte
     */
    @Query(value="SELECT * FROM empfaenger e JOIN apotheke a on e.apotheke = a.id WHERE " +
            "e.id = :empfaengerId AND a.id = :apothekeId", nativeQuery = true)
    Empfaenger findByIds(@Param("empfaengerId") String empfaengerId,
                         @Param("apothekeId") String apothekeId);
}
