package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.Notgen3App;
import se.terrassorkestern.notgen3.domain.PlayListEntry;
import se.terrassorkestern.notgen3.repository.PlayListEntryRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlayListEntryResource} REST controller.
 */
@SpringBootTest(classes = Notgen3App.class)

@AutoConfigureMockMvc
@WithMockUser
public class PlayListEntryResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Integer DEFAULT_SORT_ORDER = 1;
    private static final Integer UPDATED_SORT_ORDER = 2;

    private static final Boolean DEFAULT_BOLD = false;
    private static final Boolean UPDATED_BOLD = true;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PlayListEntryRepository playListEntryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlayListEntryMockMvc;

    private PlayListEntry playListEntry;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayListEntry createEntity(EntityManager em) {
        PlayListEntry playListEntry = new PlayListEntry()
            .text(DEFAULT_TEXT)
            .sortOrder(DEFAULT_SORT_ORDER)
            .bold(DEFAULT_BOLD)
            .comment(DEFAULT_COMMENT)
            .date(DEFAULT_DATE);
        return playListEntry;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayListEntry createUpdatedEntity(EntityManager em) {
        PlayListEntry playListEntry = new PlayListEntry()
            .text(UPDATED_TEXT)
            .sortOrder(UPDATED_SORT_ORDER)
            .bold(UPDATED_BOLD)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE);
        return playListEntry;
    }

    @BeforeEach
    public void initTest() {
        playListEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayListEntry() throws Exception {
        int databaseSizeBeforeCreate = playListEntryRepository.findAll().size();

        // Create the PlayListEntry
        restPlayListEntryMockMvc.perform(post("/api/play-list-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playListEntry)))
            .andExpect(status().isCreated());

        // Validate the PlayListEntry in the database
        List<PlayListEntry> playListEntryList = playListEntryRepository.findAll();
        assertThat(playListEntryList).hasSize(databaseSizeBeforeCreate + 1);
        PlayListEntry testPlayListEntry = playListEntryList.get(playListEntryList.size() - 1);
        assertThat(testPlayListEntry.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testPlayListEntry.getSortOrder()).isEqualTo(DEFAULT_SORT_ORDER);
        assertThat(testPlayListEntry.isBold()).isEqualTo(DEFAULT_BOLD);
        assertThat(testPlayListEntry.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testPlayListEntry.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createPlayListEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playListEntryRepository.findAll().size();

        // Create the PlayListEntry with an existing ID
        playListEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayListEntryMockMvc.perform(post("/api/play-list-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playListEntry)))
            .andExpect(status().isBadRequest());

        // Validate the PlayListEntry in the database
        List<PlayListEntry> playListEntryList = playListEntryRepository.findAll();
        assertThat(playListEntryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlayListEntries() throws Exception {
        // Initialize the database
        playListEntryRepository.saveAndFlush(playListEntry);

        // Get all the playListEntryList
        restPlayListEntryMockMvc.perform(get("/api/play-list-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playListEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].sortOrder").value(hasItem(DEFAULT_SORT_ORDER)))
            .andExpect(jsonPath("$.[*].bold").value(hasItem(DEFAULT_BOLD.booleanValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlayListEntry() throws Exception {
        // Initialize the database
        playListEntryRepository.saveAndFlush(playListEntry);

        // Get the playListEntry
        restPlayListEntryMockMvc.perform(get("/api/play-list-entries/{id}", playListEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(playListEntry.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT))
            .andExpect(jsonPath("$.sortOrder").value(DEFAULT_SORT_ORDER))
            .andExpect(jsonPath("$.bold").value(DEFAULT_BOLD.booleanValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlayListEntry() throws Exception {
        // Get the playListEntry
        restPlayListEntryMockMvc.perform(get("/api/play-list-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayListEntry() throws Exception {
        // Initialize the database
        playListEntryRepository.saveAndFlush(playListEntry);

        int databaseSizeBeforeUpdate = playListEntryRepository.findAll().size();

        // Update the playListEntry
        PlayListEntry updatedPlayListEntry = playListEntryRepository.findById(playListEntry.getId()).get();
        // Disconnect from session so that the updates on updatedPlayListEntry are not directly saved in db
        em.detach(updatedPlayListEntry);
        updatedPlayListEntry
            .text(UPDATED_TEXT)
            .sortOrder(UPDATED_SORT_ORDER)
            .bold(UPDATED_BOLD)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE);

        restPlayListEntryMockMvc.perform(put("/api/play-list-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlayListEntry)))
            .andExpect(status().isOk());

        // Validate the PlayListEntry in the database
        List<PlayListEntry> playListEntryList = playListEntryRepository.findAll();
        assertThat(playListEntryList).hasSize(databaseSizeBeforeUpdate);
        PlayListEntry testPlayListEntry = playListEntryList.get(playListEntryList.size() - 1);
        assertThat(testPlayListEntry.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testPlayListEntry.getSortOrder()).isEqualTo(UPDATED_SORT_ORDER);
        assertThat(testPlayListEntry.isBold()).isEqualTo(UPDATED_BOLD);
        assertThat(testPlayListEntry.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testPlayListEntry.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayListEntry() throws Exception {
        int databaseSizeBeforeUpdate = playListEntryRepository.findAll().size();

        // Create the PlayListEntry

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlayListEntryMockMvc.perform(put("/api/play-list-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playListEntry)))
            .andExpect(status().isBadRequest());

        // Validate the PlayListEntry in the database
        List<PlayListEntry> playListEntryList = playListEntryRepository.findAll();
        assertThat(playListEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlayListEntry() throws Exception {
        // Initialize the database
        playListEntryRepository.saveAndFlush(playListEntry);

        int databaseSizeBeforeDelete = playListEntryRepository.findAll().size();

        // Delete the playListEntry
        restPlayListEntryMockMvc.perform(delete("/api/play-list-entries/{id}", playListEntry.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlayListEntry> playListEntryList = playListEntryRepository.findAll();
        assertThat(playListEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
