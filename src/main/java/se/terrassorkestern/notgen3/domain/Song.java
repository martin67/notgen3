package se.terrassorkestern.notgen3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "sub_title")
    private String subTitle;

    @Column(name = "genre")
    private String genre;

    @Column(name = "composer")
    private String composer;

    @Column(name = "author")
    private String author;

    @Column(name = "arranger")
    private String arranger;

    @Column(name = "year")
    private Integer year;

    @Column(name = "publisher")
    private String publisher;

    @OneToMany(mappedBy = "song")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Score> scores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Song title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public Song subTitle(String subTitle) {
        this.subTitle = subTitle;
        return this;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getGenre() {
        return genre;
    }

    public Song genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getComposer() {
        return composer;
    }

    public Song composer(String composer) {
        this.composer = composer;
        return this;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public String getAuthor() {
        return author;
    }

    public Song author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getArranger() {
        return arranger;
    }

    public Song arranger(String arranger) {
        this.arranger = arranger;
        return this;
    }

    public void setArranger(String arranger) {
        this.arranger = arranger;
    }

    public Integer getYear() {
        return year;
    }

    public Song year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getPublisher() {
        return publisher;
    }

    public Song publisher(String publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public Song scores(Set<Score> scores) {
        this.scores = scores;
        return this;
    }

    public Song addScore(Score score) {
        this.scores.add(score);
        score.setSong(this);
        return this;
    }

    public Song removeScore(Score score) {
        this.scores.remove(score);
        score.setSong(null);
        return this;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", subTitle='" + getSubTitle() + "'" +
            ", genre='" + getGenre() + "'" +
            ", composer='" + getComposer() + "'" +
            ", author='" + getAuthor() + "'" +
            ", arranger='" + getArranger() + "'" +
            ", year=" + getYear() +
            ", publisher='" + getPublisher() + "'" +
            "}";
    }
}
