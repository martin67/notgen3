package se.terrassorkestern.notgen3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Instrument.
 */
@Entity
@Table(name = "instrument")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Instrument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "instrument")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScorePart> scoreParts = new HashSet<>();

    @ManyToMany(mappedBy = "instruments")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Setting> settings = new HashSet<>();

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

    public Instrument name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ScorePart> getScoreParts() {
        return scoreParts;
    }

    public Instrument scoreParts(Set<ScorePart> scoreParts) {
        this.scoreParts = scoreParts;
        return this;
    }

    public Instrument addScorePart(ScorePart scorePart) {
        this.scoreParts.add(scorePart);
        scorePart.setInstrument(this);
        return this;
    }

    public Instrument removeScorePart(ScorePart scorePart) {
        this.scoreParts.remove(scorePart);
        scorePart.setInstrument(null);
        return this;
    }

    public void setScoreParts(Set<ScorePart> scoreParts) {
        this.scoreParts = scoreParts;
    }

    public Set<Setting> getSettings() {
        return settings;
    }

    public Instrument settings(Set<Setting> settings) {
        this.settings = settings;
        return this;
    }

    public Instrument addSetting(Setting setting) {
        this.settings.add(setting);
        setting.getInstruments().add(this);
        return this;
    }

    public Instrument removeSetting(Setting setting) {
        this.settings.remove(setting);
        setting.getInstruments().remove(this);
        return this;
    }

    public void setSettings(Set<Setting> settings) {
        this.settings = settings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instrument)) {
            return false;
        }
        return id != null && id.equals(((Instrument) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Instrument{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
