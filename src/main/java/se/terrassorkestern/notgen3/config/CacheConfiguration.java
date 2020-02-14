package se.terrassorkestern.notgen3.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, se.terrassorkestern.notgen3.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, se.terrassorkestern.notgen3.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, se.terrassorkestern.notgen3.domain.User.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Authority.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.User.class.getName() + ".authorities");
            createCache(cm, se.terrassorkestern.notgen3.domain.Song.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Song.class.getName() + ".scores");
            createCache(cm, se.terrassorkestern.notgen3.domain.Instrument.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Instrument.class.getName() + ".scoreParts");
            createCache(cm, se.terrassorkestern.notgen3.domain.Instrument.class.getName() + ".settings");
            createCache(cm, se.terrassorkestern.notgen3.domain.Score.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Score.class.getName() + ".scoreParts");
            createCache(cm, se.terrassorkestern.notgen3.domain.ScorePart.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.PlayList.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.PlayList.class.getName() + ".playListEntries");
            createCache(cm, se.terrassorkestern.notgen3.domain.PlayListEntry.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Setting.class.getName());
            createCache(cm, se.terrassorkestern.notgen3.domain.Setting.class.getName() + ".instruments");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
