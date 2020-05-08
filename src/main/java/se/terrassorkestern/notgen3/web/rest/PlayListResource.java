package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.domain.PlayList;
import se.terrassorkestern.notgen3.repository.PlayListRepository;
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
 * REST controller for managing {@link se.terrassorkestern.notgen3.domain.PlayList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlayListResource {

    private final Logger log = LoggerFactory.getLogger(PlayListResource.class);

    private static final String ENTITY_NAME = "playList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlayListRepository playListRepository;

    public PlayListResource(PlayListRepository playListRepository) {
        this.playListRepository = playListRepository;
    }

    /**
     * {@code POST  /play-lists} : Create a new playList.
     *
     * @param playList the playList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playList, or with status {@code 400 (Bad Request)} if the playList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/play-lists")
    public ResponseEntity<PlayList> createPlayList(@RequestBody PlayList playList) throws URISyntaxException {
        log.debug("REST request to save PlayList : {}", playList);
        if (playList.getId() != null) {
            throw new BadRequestAlertException("A new playList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayList result = playListRepository.save(playList);
        return ResponseEntity.created(new URI("/api/play-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /play-lists} : Updates an existing playList.
     *
     * @param playList the playList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playList,
     * or with status {@code 400 (Bad Request)} if the playList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/play-lists")
    public ResponseEntity<PlayList> updatePlayList(@RequestBody PlayList playList) throws URISyntaxException {
        log.debug("REST request to update PlayList : {}", playList);
        if (playList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlayList result = playListRepository.save(playList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /play-lists} : get all the playLists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playLists in body.
     */
    @GetMapping("/play-lists")
    public List<PlayList> getAllPlayLists() {
        log.debug("REST request to get all PlayLists");
        return playListRepository.findAll();
    }

    /**
     * {@code GET  /play-lists/:id} : get the "id" playList.
     *
     * @param id the id of the playList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/play-lists/{id}")
    public ResponseEntity<PlayList> getPlayList(@PathVariable Long id) {
        log.debug("REST request to get PlayList : {}", id);
        Optional<PlayList> playList = playListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(playList);
    }

    /**
     * {@code DELETE  /play-lists/:id} : delete the "id" playList.
     *
     * @param id the id of the playList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/play-lists/{id}")
    public ResponseEntity<Void> deletePlayList(@PathVariable Long id) {
        log.debug("REST request to delete PlayList : {}", id);
        playListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
