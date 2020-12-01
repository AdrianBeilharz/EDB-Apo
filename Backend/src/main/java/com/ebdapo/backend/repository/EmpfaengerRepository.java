package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Empfaenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmpfaengerRepository extends JpaRepository<Empfaenger, String > {


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

    @Query(value="SELECT * FROM empfaenger e JOIN apotheke a on e.apotheke = a.id WHERE " +
            "e.id = :empfaengerId AND a.id = :apothekeId", nativeQuery = true)
    Empfaenger findByIds(@Param("empfaengerId") String empfaengerId,
                         @Param("apothekeId") String apothekeId);
}
