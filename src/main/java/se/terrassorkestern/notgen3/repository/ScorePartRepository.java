package se.terrassorkestern.notgen3.repository;

import se.terrassorkestern.notgen3.domain.ScorePart;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ScorePart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScorePartRepository extends JpaRepository<ScorePart, Long> {
}
