package se.terrassorkestern.notgen3.repository;

import se.terrassorkestern.notgen3.domain.Setting;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Setting entity.
 */
@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {

    @Query(value = "select distinct setting from Setting setting left join fetch setting.instruments",
        countQuery = "select count(distinct setting) from Setting setting")
    Page<Setting> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct setting from Setting setting left join fetch setting.instruments")
    List<Setting> findAllWithEagerRelationships();

    @Query("select setting from Setting setting left join fetch setting.instruments where setting.id =:id")
    Optional<Setting> findOneWithEagerRelationships(@Param("id") Long id);
}
