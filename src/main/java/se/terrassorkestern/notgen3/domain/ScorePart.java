package se.terrassorkestern.notgen3.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ScorePart.
 */
@Entity
@Table(name = "score_part")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ScorePart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "page")
    private Integer page;

    @Column(name = "length")
    private Integer length;

    @Column(name = "comment")
    private String comment;

    @Column(name = "google_id")
    private String googleId;

    @ManyToOne
    @JsonIgnoreProperties("scoreParts")
    private Score score;

    @ManyToOne
    @JsonIgnoreProperties("scoreParts")
    private Instrument instrument;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPage() {
        return page;
    }

    public ScorePart page(Integer page) {
        this.page = page;
        return this;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getLength() {
        return length;
    }

    public ScorePart length(Integer length) {
        this.length = length;
        return this;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getComment() {
        return comment;
    }

    public ScorePart comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getGoogleId() {
        return googleId;
    }

    public ScorePart googleId(String googleId) {
        this.googleId = googleId;
        return this;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Score getScore() {
        return score;
    }

    public ScorePart score(Score score) {
        this.score = score;
        return this;
    }

    public void setScore(Score score) {
        this.score = score;
    }

    public Instrument getInstrument() {
        return instrument;
    }

    public ScorePart instrument(Instrument instrument) {
        this.instrument = instrument;
        return this;
    }

    public void setInstrument(Instrument instrument) {
        this.instrument = instrument;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ScorePart)) {
            return false;
        }
        return id != null && id.equals(((ScorePart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ScorePart{" +
            "id=" + getId() +
            ", page=" + getPage() +
            ", length=" + getLength() +
            ", comment='" + getComment() + "'" +
            ", googleId='" + getGoogleId() + "'" +
            "}";
    }
}
