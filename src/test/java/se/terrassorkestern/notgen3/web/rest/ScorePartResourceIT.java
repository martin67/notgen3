package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.Notgen3App;
import se.terrassorkestern.notgen3.domain.ScorePart;
import se.terrassorkestern.notgen3.repository.ScorePartRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ScorePartResource} REST controller.
 */
@SpringBootTest(classes = Notgen3App.class)

@AutoConfigureMockMvc
@WithMockUser
public class ScorePartResourceIT {

    private static final Integer DEFAULT_PAGE = 1;
    private static final Integer UPDATED_PAGE = 2;

    private static final Integer DEFAULT_LENGTH = 1;
    private static final Integer UPDATED_LENGTH = 2;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_GOOGLE_ID = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_ID = "BBBBBBBBBB";

    @Autowired
    private ScorePartRepository scorePartRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restScorePartMockMvc;

    private ScorePart scorePart;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ScorePart createEntity(EntityManager em) {
        ScorePart scorePart = new ScorePart()
            .page(DEFAULT_PAGE)
            .length(DEFAULT_LENGTH)
            .comment(DEFAULT_COMMENT)
            .googleId(DEFAULT_GOOGLE_ID);
        return scorePart;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ScorePart createUpdatedEntity(EntityManager em) {
        ScorePart scorePart = new ScorePart()
            .page(UPDATED_PAGE)
            .length(UPDATED_LENGTH)
            .comment(UPDATED_COMMENT)
            .googleId(UPDATED_GOOGLE_ID);
        return scorePart;
    }

    @BeforeEach
    public void initTest() {
        scorePart = createEntity(em);
    }

    @Test
    @Transactional
    public void createScorePart() throws Exception {
        int databaseSizeBeforeCreate = scorePartRepository.findAll().size();

        // Create the ScorePart
        restScorePartMockMvc.perform(post("/api/score-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(scorePart)))
            .andExpect(status().isCreated());

        // Validate the ScorePart in the database
        List<ScorePart> scorePartList = scorePartRepository.findAll();
        assertThat(scorePartList).hasSize(databaseSizeBeforeCreate + 1);
        ScorePart testScorePart = scorePartList.get(scorePartList.size() - 1);
        assertThat(testScorePart.getPage()).isEqualTo(DEFAULT_PAGE);
        assertThat(testScorePart.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testScorePart.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testScorePart.getGoogleId()).isEqualTo(DEFAULT_GOOGLE_ID);
    }

    @Test
    @Transactional
    public void createScorePartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scorePartRepository.findAll().size();

        // Create the ScorePart with an existing ID
        scorePart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScorePartMockMvc.perform(post("/api/score-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(scorePart)))
            .andExpect(status().isBadRequest());

        // Validate the ScorePart in the database
        List<ScorePart> scorePartList = scorePartRepository.findAll();
        assertThat(scorePartList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllScoreParts() throws Exception {
        // Initialize the database
        scorePartRepository.saveAndFlush(scorePart);

        // Get all the scorePartList
        restScorePartMockMvc.perform(get("/api/score-parts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scorePart.getId().intValue())))
            .andExpect(jsonPath("$.[*].page").value(hasItem(DEFAULT_PAGE)))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].googleId").value(hasItem(DEFAULT_GOOGLE_ID)));
    }
    
    @Test
    @Transactional
    public void getScorePart() throws Exception {
        // Initialize the database
        scorePartRepository.saveAndFlush(scorePart);

        // Get the scorePart
        restScorePartMockMvc.perform(get("/api/score-parts/{id}", scorePart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(scorePart.getId().intValue()))
            .andExpect(jsonPath("$.page").value(DEFAULT_PAGE))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.googleId").value(DEFAULT_GOOGLE_ID));
    }

    @Test
    @Transactional
    public void getNonExistingScorePart() throws Exception {
        // Get the scorePart
        restScorePartMockMvc.perform(get("/api/score-parts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScorePart() throws Exception {
        // Initialize the database
        scorePartRepository.saveAndFlush(scorePart);

        int databaseSizeBeforeUpdate = scorePartRepository.findAll().size();

        // Update the scorePart
        ScorePart updatedScorePart = scorePartRepository.findById(scorePart.getId()).get();
        // Disconnect from session so that the updates on updatedScorePart are not directly saved in db
        em.detach(updatedScorePart);
        updatedScorePart
            .page(UPDATED_PAGE)
            .length(UPDATED_LENGTH)
            .comment(UPDATED_COMMENT)
            .googleId(UPDATED_GOOGLE_ID);

        restScorePartMockMvc.perform(put("/api/score-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedScorePart)))
            .andExpect(status().isOk());

        // Validate the ScorePart in the database
        List<ScorePart> scorePartList = scorePartRepository.findAll();
        assertThat(scorePartList).hasSize(databaseSizeBeforeUpdate);
        ScorePart testScorePart = scorePartList.get(scorePartList.size() - 1);
        assertThat(testScorePart.getPage()).isEqualTo(UPDATED_PAGE);
        assertThat(testScorePart.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testScorePart.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testScorePart.getGoogleId()).isEqualTo(UPDATED_GOOGLE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingScorePart() throws Exception {
        int databaseSizeBeforeUpdate = scorePartRepository.findAll().size();

        // Create the ScorePart

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScorePartMockMvc.perform(put("/api/score-parts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(scorePart)))
            .andExpect(status().isBadRequest());

        // Validate the ScorePart in the database
        List<ScorePart> scorePartList = scorePartRepository.findAll();
        assertThat(scorePartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScorePart() throws Exception {
        // Initialize the database
        scorePartRepository.saveAndFlush(scorePart);

        int databaseSizeBeforeDelete = scorePartRepository.findAll().size();

        // Delete the scorePart
        restScorePartMockMvc.perform(delete("/api/score-parts/{id}", scorePart.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ScorePart> scorePartList = scorePartRepository.findAll();
        assertThat(scorePartList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
