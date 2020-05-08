package se.terrassorkestern.notgen3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PlayList.
 */
@Entity
@Table(name = "play_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlayList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "comment")
    private String comment;

    @OneToMany(mappedBy = "playList")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PlayListEntry> playListEntries = new HashSet<>();

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

    public PlayList name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public PlayList comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<PlayListEntry> getPlayListEntries() {
        return playListEntries;
    }

    public PlayList playListEntries(Set<PlayListEntry> playListEntries) {
        this.playListEntries = playListEntries;
        return this;
    }

    public PlayList addPlayListEntry(PlayListEntry playListEntry) {
        this.playListEntries.add(playListEntry);
        playListEntry.setPlayList(this);
        return this;
    }

    public PlayList removePlayListEntry(PlayListEntry playListEntry) {
        this.playListEntries.remove(playListEntry);
        playListEntry.setPlayList(null);
        return this;
    }

    public void setPlayListEntries(Set<PlayListEntry> playListEntries) {
        this.playListEntries = playListEntries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlayList)) {
            return false;
        }
        return id != null && id.equals(((PlayList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlayList{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
