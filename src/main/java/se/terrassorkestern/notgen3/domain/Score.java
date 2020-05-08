package se.terrassorkestern.notgen3.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Score.
 */
@Entity
@Table(name = "score")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "score")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScorePart> scoreParts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("scores")
    private Song song;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Score name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ScorePart> getScoreParts() {
        return scoreParts;
    }

    public Score scoreParts(Set<ScorePart> scoreParts) {
        this.scoreParts = scoreParts;
        return this;
    }

    public Score addScorePart(ScorePart scorePart) {
        this.scoreParts.add(scorePart);
        scorePart.setScore(this);
        return this;
    }

    public Score removeScorePart(ScorePart scorePart) {
        this.scoreParts.remove(scorePart);
        scorePart.setScore(null);
        return this;
    }

    public void setScoreParts(Set<ScorePart> scoreParts) {
        this.scoreParts = scoreParts;
    }

    public Song getSong() {
        return song;
    }

    public Score song(Song song) {
        this.song = song;
        return this;
    }

    public void setSong(Song song) {
        this.song = song;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Score)) {
            return false;
        }
        return id != null && id.equals(((Score) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Score{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
