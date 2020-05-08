package se.terrassorkestern.notgen3.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import se.terrassorkestern.notgen3.web.rest.TestUtil;

public class ScorePartTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScorePart.class);
        ScorePart scorePart1 = new ScorePart();
        scorePart1.setId(1L);
        ScorePart scorePart2 = new ScorePart();
        scorePart2.setId(scorePart1.getId());
        assertThat(scorePart1).isEqualTo(scorePart2);
        scorePart2.setId(2L);
        assertThat(scorePart1).isNotEqualTo(scorePart2);
        scorePart1.setId(null);
        assertThat(scorePart1).isNotEqualTo(scorePart2);
    }
}
