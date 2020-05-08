package se.terrassorkestern.notgen3.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import se.terrassorkestern.notgen3.web.rest.TestUtil;

public class PlayListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlayList.class);
        PlayList playList1 = new PlayList();
        playList1.setId(1L);
        PlayList playList2 = new PlayList();
        playList2.setId(playList1.getId());
        assertThat(playList1).isEqualTo(playList2);
        playList2.setId(2L);
        assertThat(playList1).isNotEqualTo(playList2);
        playList1.setId(null);
        assertThat(playList1).isNotEqualTo(playList2);
    }
}
