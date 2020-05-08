import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notgen3SharedModule } from 'app/shared/shared.module';
import { PlayListEntryComponent } from './play-list-entry.component';
import { PlayListEntryDetailComponent } from './play-list-entry-detail.component';
import { PlayListEntryUpdateComponent } from './play-list-entry-update.component';
import { PlayListEntryDeleteDialogComponent } from './play-list-entry-delete-dialog.component';
import { playListEntryRoute } from './play-list-entry.route';

@NgModule({
  imports: [Notgen3SharedModule, RouterModule.forChild(playListEntryRoute)],
  declarations: [PlayListEntryComponent, PlayListEntryDetailComponent, PlayListEntryUpdateComponent, PlayListEntryDeleteDialogComponent],
  entryComponents: [PlayListEntryDeleteDialogComponent]
})
export class Notgen3PlayListEntryModule {}
