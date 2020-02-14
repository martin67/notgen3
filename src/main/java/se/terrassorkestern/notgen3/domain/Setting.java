package se.terrassorkestern.notgen3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Setting.
 */
@Entity
@Table(name = "setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Setting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "setting_instrument",
               joinColumns = @JoinColumn(name = "setting_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "instrument_id", referencedColumnName = "id"))
    private Set<Instrument> instruments = new HashSet<>();

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

    public Setting name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Instrument> getInstruments() {
        return instruments;
    }

    public Setting instruments(Set<Instrument> instruments) {
        this.instruments = instruments;
        return this;
    }

    public Setting addInstrument(Instrument instrument) {
        this.instruments.add(instrument);
        instrument.getSettings().add(this);
        return this;
    }

    public Setting removeInstrument(Instrument instrument) {
        this.instruments.remove(instrument);
        instrument.getSettings().remove(this);
        return this;
    }

    public void setInstruments(Set<Instrument> instruments) {
        this.instruments = instruments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Setting)) {
            return false;
        }
        return id != null && id.equals(((Setting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Setting{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
