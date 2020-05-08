package se.terrassorkestern.notgen3.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A PlayListEntry.
 */
@Entity
@Table(name = "play_list_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlayListEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "bold")
    private Boolean bold;

    @Column(name = "comment")
    private String comment;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("playListEntries")
    private PlayList playList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public PlayListEntry text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public PlayListEntry sortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
        return this;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Boolean isBold() {
        return bold;
    }

    public PlayListEntry bold(Boolean bold) {
        this.bold = bold;
        return this;
    }

    public void setBold(Boolean bold) {
        this.bold = bold;
    }

    public String getComment() {
        return comment;
    }

    public PlayListEntry comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getDate() {
        return date;
    }

    public PlayListEntry date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public PlayList getPlayList() {
        return playList;
    }

    public PlayListEntry playList(PlayList playList) {
        this.playList = playList;
        return this;
    }

    public void setPlayList(PlayList playList) {
        this.playList = playList;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlayListEntry)) {
            return false;
        }
        return id != null && id.equals(((PlayListEntry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlayListEntry{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", sortOrder=" + getSortOrder() +
            ", bold='" + isBold() + "'" +
            ", comment='" + getComment() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
