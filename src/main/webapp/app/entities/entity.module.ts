import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'song',
        loadChildren: () => import('./song/song.module').then(m => m.Notgen3SongModule)
      },
      {
        path: 'instrument',
        loadChildren: () => import('./instrument/instrument.module').then(m => m.Notgen3InstrumentModule)
      },
      {
        path: 'score',
        loadChildren: () => import('./score/score.module').then(m => m.Notgen3ScoreModule)
      },
      {
        path: 'score-part',
        loadChildren: () => import('./score-part/score-part.module').then(m => m.Notgen3ScorePartModule)
      },
      {
        path: 'play-list',
        loadChildren: () => import('./play-list/play-list.module').then(m => m.Notgen3PlayListModule)
      },
      {
        path: 'play-list-entry',
        loadChildren: () => import('./play-list-entry/play-list-entry.module').then(m => m.Notgen3PlayListEntryModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.Notgen3SettingModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Notgen3EntityModule {}
