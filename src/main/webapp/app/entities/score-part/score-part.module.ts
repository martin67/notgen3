import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notgen3SharedModule } from 'app/shared/shared.module';
import { ScorePartComponent } from './score-part.component';
import { ScorePartDetailComponent } from './score-part-detail.component';
import { ScorePartUpdateComponent } from './score-part-update.component';
import { ScorePartDeleteDialogComponent } from './score-part-delete-dialog.component';
import { scorePartRoute } from './score-part.route';

@NgModule({
  imports: [Notgen3SharedModule, RouterModule.forChild(scorePartRoute)],
  declarations: [ScorePartComponent, ScorePartDetailComponent, ScorePartUpdateComponent, ScorePartDeleteDialogComponent],
  entryComponents: [ScorePartDeleteDialogComponent]
})
export class Notgen3ScorePartModule {}
