package se.terrassorkestern.notgen3.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import se.terrassorkestern.notgen3.web.rest.TestUtil;

public class PlayListEntryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayListEntry.class);
        PlayListEntry playListEntry1 = new PlayListEntry();
        playListEntry1.setId(1L);
        PlayListEntry playListEntry2 = new PlayListEntry();
        playListEntry2.setId(playListEntry1.getId());
        assertThat(playListEntry1).isEqualTo(playListEntry2);
        playListEntry2.setId(2L);
        assertThat(playListEntry1).isNotEqualTo(playListEntry2);
        playListEntry1.setId(null);
        assertThat(playListEntry1).isNotEqualTo(playListEntry2);
    }
}
