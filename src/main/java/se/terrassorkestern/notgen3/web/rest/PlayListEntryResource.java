package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.domain.PlayListEntry;
import se.terrassorkestern.notgen3.repository.PlayListEntryRepository;
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
 * REST controller for managing {@link se.terrassorkestern.notgen3.domain.PlayListEntry}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlayListEntryResource {

    private final Logger log = LoggerFactory.getLogger(PlayListEntryResource.class);

    private static final String ENTITY_NAME = "playListEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlayListEntryRepository playListEntryRepository;

    public PlayListEntryResource(PlayListEntryRepository playListEntryRepository) {
        this.playListEntryRepository = playListEntryRepository;
    }

    /**
     * {@code POST  /play-list-entries} : Create a new playListEntry.
     *
     * @param playListEntry the playListEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playListEntry, or with status {@code 400 (Bad Request)} if the playListEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/play-list-entries")
    public ResponseEntity<PlayListEntry> createPlayListEntry(@RequestBody PlayListEntry playListEntry) throws URISyntaxException {
        log.debug("REST request to save PlayListEntry : {}", playListEntry);
        if (playListEntry.getId() != null) {
            throw new BadRequestAlertException("A new playListEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayListEntry result = playListEntryRepository.save(playListEntry);
        return ResponseEntity.created(new URI("/api/play-list-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /play-list-entries} : Updates an existing playListEntry.
     *
     * @param playListEntry the playListEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playListEntry,
     * or with status {@code 400 (Bad Request)} if the playListEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playListEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/play-list-entries")
    public ResponseEntity<PlayListEntry> updatePlayListEntry(@RequestBody PlayListEntry playListEntry) throws URISyntaxException {
        log.debug("REST request to update PlayListEntry : {}", playListEntry);
        if (playListEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlayListEntry result = playListEntryRepository.save(playListEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playListEntry.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /play-list-entries} : get all the playListEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playListEntries in body.
     */
    @GetMapping("/play-list-entries")
    public List<PlayListEntry> getAllPlayListEntries() {
        log.debug("REST request to get all PlayListEntries");
        return playListEntryRepository.findAll();
    }

    /**
     * {@code GET  /play-list-entries/:id} : get the "id" playListEntry.
     *
     * @param id the id of the playListEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playListEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/play-list-entries/{id}")
    public ResponseEntity<PlayListEntry> getPlayListEntry(@PathVariable Long id) {
        log.debug("REST request to get PlayListEntry : {}", id);
        Optional<PlayListEntry> playListEntry = playListEntryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(playListEntry);
    }

    /**
     * {@code DELETE  /play-list-entries/:id} : delete the "id" playListEntry.
     *
     * @param id the id of the playListEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/play-list-entries/{id}")
    public ResponseEntity<Void> deletePlayListEntry(@PathVariable Long id) {
        log.debug("REST request to delete PlayListEntry : {}", id);
        playListEntryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
