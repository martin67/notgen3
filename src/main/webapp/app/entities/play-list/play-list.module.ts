import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notgen3SharedModule } from 'app/shared/shared.module';
import { PlayListComponent } from './play-list.component';
import { PlayListDetailComponent } from './play-list-detail.component';
import { PlayListUpdateComponent } from './play-list-update.component';
import { PlayListDeleteDialogComponent } from './play-list-delete-dialog.component';
import { playListRoute } from './play-list.route';

@NgModule({
  imports: [Notgen3SharedModule, RouterModule.forChild(playListRoute)],
  declarations: [PlayListComponent, PlayListDetailComponent, PlayListUpdateComponent, PlayListDeleteDialogComponent],
  entryComponents: [PlayListDeleteDialogComponent]
})
export class Notgen3PlayListModule {}
