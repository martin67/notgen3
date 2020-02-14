package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.domain.Setting;
import se.terrassorkestern.notgen3.repository.SettingRepository;
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
 * REST controller for managing {@link se.terrassorkestern.notgen3.domain.Setting}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SettingResource {

    private final Logger log = LoggerFactory.getLogger(SettingResource.class);

    private static final String ENTITY_NAME = "setting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SettingRepository settingRepository;

    public SettingResource(SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    /**
     * {@code POST  /settings} : Create a new setting.
     *
     * @param setting the setting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new setting, or with status {@code 400 (Bad Request)} if the setting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/settings")
    public ResponseEntity<Setting> createSetting(@RequestBody Setting setting) throws URISyntaxException {
        log.debug("REST request to save Setting : {}", setting);
        if (setting.getId() != null) {
            throw new BadRequestAlertException("A new setting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Setting result = settingRepository.save(setting);
        return ResponseEntity.created(new URI("/api/settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /settings} : Updates an existing setting.
     *
     * @param setting the setting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated setting,
     * or with status {@code 400 (Bad Request)} if the setting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the setting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/settings")
    public ResponseEntity<Setting> updateSetting(@RequestBody Setting setting) throws URISyntaxException {
        log.debug("REST request to update Setting : {}", setting);
        if (setting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Setting result = settingRepository.save(setting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, setting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /settings} : get all the settings.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of settings in body.
     */
    @GetMapping("/settings")
    public List<Setting> getAllSettings(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Settings");
        return settingRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /settings/:id} : get the "id" setting.
     *
     * @param id the id of the setting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the setting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/settings/{id}")
    public ResponseEntity<Setting> getSetting(@PathVariable Long id) {
        log.debug("REST request to get Setting : {}", id);
        Optional<Setting> setting = settingRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(setting);
    }

    /**
     * {@code DELETE  /settings/:id} : delete the "id" setting.
     *
     * @param id the id of the setting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/settings/{id}")
    public ResponseEntity<Void> deleteSetting(@PathVariable Long id) {
        log.debug("REST request to delete Setting : {}", id);
        settingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
