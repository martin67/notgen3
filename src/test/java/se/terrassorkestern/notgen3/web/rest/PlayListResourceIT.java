package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.Notgen3App;
import se.terrassorkestern.notgen3.domain.PlayList;
import se.terrassorkestern.notgen3.repository.PlayListRepository;
import se.terrassorkestern.notgen3.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static se.terrassorkestern.notgen3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlayListResource} REST controller.
 */
@SpringBootTest(classes = Notgen3App.class)
public class PlayListResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private PlayListRepository playListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlayListMockMvc;

    private PlayList playList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlayListResource playListResource = new PlayListResource(playListRepository);
        this.restPlayListMockMvc = MockMvcBuilders.standaloneSetup(playListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayList createEntity(EntityManager em) {
        PlayList playList = new PlayList()
            .name(DEFAULT_NAME)
            .comment(DEFAULT_COMMENT);
        return playList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlayList createUpdatedEntity(EntityManager em) {
        PlayList playList = new PlayList()
            .name(UPDATED_NAME)
            .comment(UPDATED_COMMENT);
        return playList;
    }

    @BeforeEach
    public void initTest() {
        playList = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayList() throws Exception {
        int databaseSizeBeforeCreate = playListRepository.findAll().size();

        // Create the PlayList
        restPlayListMockMvc.perform(post("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playList)))
            .andExpect(status().isCreated());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeCreate + 1);
        PlayList testPlayList = playListList.get(playListList.size() - 1);
        assertThat(testPlayList.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlayList.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createPlayListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playListRepository.findAll().size();

        // Create the PlayList with an existing ID
        playList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlayListMockMvc.perform(post("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playList)))
            .andExpect(status().isBadRequest());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlayLists() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        // Get all the playListList
        restPlayListMockMvc.perform(get("/api/play-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }
    
    @Test
    @Transactional
    public void getPlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        // Get the playList
        restPlayListMockMvc.perform(get("/api/play-lists/{id}", playList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(playList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT));
    }

    @Test
    @Transactional
    public void getNonExistingPlayList() throws Exception {
        // Get the playList
        restPlayListMockMvc.perform(get("/api/play-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        int databaseSizeBeforeUpdate = playListRepository.findAll().size();

        // Update the playList
        PlayList updatedPlayList = playListRepository.findById(playList.getId()).get();
        // Disconnect from session so that the updates on updatedPlayList are not directly saved in db
        em.detach(updatedPlayList);
        updatedPlayList
            .name(UPDATED_NAME)
            .comment(UPDATED_COMMENT);

        restPlayListMockMvc.perform(put("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlayList)))
            .andExpect(status().isOk());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeUpdate);
        PlayList testPlayList = playListList.get(playListList.size() - 1);
        assertThat(testPlayList.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlayList.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayList() throws Exception {
        int databaseSizeBeforeUpdate = playListRepository.findAll().size();

        // Create the PlayList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlayListMockMvc.perform(put("/api/play-lists")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(playList)))
            .andExpect(status().isBadRequest());

        // Validate the PlayList in the database
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlayList() throws Exception {
        // Initialize the database
        playListRepository.saveAndFlush(playList);

        int databaseSizeBeforeDelete = playListRepository.findAll().size();

        // Delete the playList
        restPlayListMockMvc.perform(delete("/api/play-lists/{id}", playList.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlayList> playListList = playListRepository.findAll();
        assertThat(playListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
