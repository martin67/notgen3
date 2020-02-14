package se.terrassorkestern.notgen3.web.rest;

import se.terrassorkestern.notgen3.Notgen3App;
import se.terrassorkestern.notgen3.domain.Instrument;
import se.terrassorkestern.notgen3.repository.InstrumentRepository;
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
 * Integration tests for the {@link InstrumentResource} REST controller.
 */
@SpringBootTest(classes = Notgen3App.class)
public class InstrumentResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private InstrumentRepository instrumentRepository;

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

    private MockMvc restInstrumentMockMvc;

    private Instrument instrument;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstrumentResource instrumentResource = new InstrumentResource(instrumentRepository);
        this.restInstrumentMockMvc = MockMvcBuilders.standaloneSetup(instrumentResource)
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
    public static Instrument createEntity(EntityManager em) {
        Instrument instrument = new Instrument()
            .name(DEFAULT_NAME);
        return instrument;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instrument createUpdatedEntity(EntityManager em) {
        Instrument instrument = new Instrument()
            .name(UPDATED_NAME);
        return instrument;
    }

    @BeforeEach
    public void initTest() {
        instrument = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstrument() throws Exception {
        int databaseSizeBeforeCreate = instrumentRepository.findAll().size();

        // Create the Instrument
        restInstrumentMockMvc.perform(post("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instrument)))
            .andExpect(status().isCreated());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeCreate + 1);
        Instrument testInstrument = instrumentList.get(instrumentList.size() - 1);
        assertThat(testInstrument.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createInstrumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instrumentRepository.findAll().size();

        // Create the Instrument with an existing ID
        instrument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstrumentMockMvc.perform(post("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instrument)))
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInstruments() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        // Get all the instrumentList
        restInstrumentMockMvc.perform(get("/api/instruments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instrument.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        // Get the instrument
        restInstrumentMockMvc.perform(get("/api/instruments/{id}", instrument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instrument.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingInstrument() throws Exception {
        // Get the instrument
        restInstrumentMockMvc.perform(get("/api/instruments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        int databaseSizeBeforeUpdate = instrumentRepository.findAll().size();

        // Update the instrument
        Instrument updatedInstrument = instrumentRepository.findById(instrument.getId()).get();
        // Disconnect from session so that the updates on updatedInstrument are not directly saved in db
        em.detach(updatedInstrument);
        updatedInstrument
            .name(UPDATED_NAME);

        restInstrumentMockMvc.perform(put("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstrument)))
            .andExpect(status().isOk());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeUpdate);
        Instrument testInstrument = instrumentList.get(instrumentList.size() - 1);
        assertThat(testInstrument.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingInstrument() throws Exception {
        int databaseSizeBeforeUpdate = instrumentRepository.findAll().size();

        // Create the Instrument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstrumentMockMvc.perform(put("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(instrument)))
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        int databaseSizeBeforeDelete = instrumentRepository.findAll().size();

        // Delete the instrument
        restInstrumentMockMvc.perform(delete("/api/instruments/{id}", instrument.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
