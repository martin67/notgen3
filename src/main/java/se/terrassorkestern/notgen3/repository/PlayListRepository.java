package se.terrassorkestern.notgen3.repository;

import se.terrassorkestern.notgen3.domain.PlayList;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PlayList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}
