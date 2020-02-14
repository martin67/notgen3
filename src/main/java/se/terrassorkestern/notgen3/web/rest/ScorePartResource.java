package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.domain.ScorePart;
import se.terrassorkestern.notgen3.repository.ScorePartRepository;
import se.terrassorkestern.notgen3.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link se.terrassorkestern.notgen3.domain.ScorePart}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ScorePartResource {

    private final Logger log = LoggerFactory.getLogger(ScorePartResource.class);

    private static final String ENTITY_NAME = "scorePart";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ScorePartRepository scorePartRepository;

    public ScorePartResource(ScorePartRepository scorePartRepository) {
        this.scorePartRepository = scorePartRepository;
    }

    /**
     * {@code POST  /score-parts} : Create a new scorePart.
     *
     * @param scorePart the scorePart to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new scorePart, or with status {@code 400 (Bad Request)} if the scorePart has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/score-parts")
    public ResponseEntity<ScorePart> createScorePart(@RequestBody ScorePart scorePart) throws URISyntaxException {
        log.debug("REST request to save ScorePart : {}", scorePart);
        if (scorePart.getId() != null) {
            throw new BadRequestAlertException("A new scorePart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScorePart result = scorePartRepository.save(scorePart);
        return ResponseEntity.created(new URI("/api/score-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /score-parts} : Updates an existing scorePart.
     *
     * @param scorePart the scorePart to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scorePart,
     * or with status {@code 400 (Bad Request)} if the scorePart is not valid,
     * or with status {@code 500 (Internal Server Error)} if the scorePart couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/score-parts")
    public ResponseEntity<ScorePart> updateScorePart(@RequestBody ScorePart scorePart) throws URISyntaxException {
        log.debug("REST request to update ScorePart : {}", scorePart);
        if (scorePart.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScorePart result = scorePartRepository.save(scorePart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scorePart.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /score-parts} : get all the scoreParts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of scoreParts in body.
     */
    @GetMapping("/score-parts")
    public List<ScorePart> getAllScoreParts() {
        log.debug("REST request to get all ScoreParts");
        return scorePartRepository.findAll();
    }

    /**
     * {@code GET  /score-parts/:id} : get the "id" scorePart.
     *
     * @param id the id of the scorePart to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the scorePart, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/score-parts/{id}")
    public ResponseEntity<ScorePart> getScorePart(@PathVariable Long id) {
        log.debug("REST request to get ScorePart : {}", id);
        Optional<ScorePart> scorePart = scorePartRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(scorePart);
    }

    /**
     * {@code DELETE  /score-parts/:id} : delete the "id" scorePart.
     *
     * @param id the id of the scorePart to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/score-parts/{id}")
    public ResponseEntity<Void> deleteScorePart(@PathVariable Long id) {
        log.debug("REST request to delete ScorePart : {}", id);
        scorePartRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
