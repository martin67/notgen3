package se.terrassorkestern.notgen3.repository;

import se.terrassorkestern.notgen3.domain.PlayListEntry;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PlayListEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListEntryRepository extends JpaRepository<PlayListEntry, Long> {

}
