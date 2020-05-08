import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notgen3SharedModule } from 'app/shared/shared.module';
import { InstrumentComponent } from './instrument.component';
import { InstrumentDetailComponent } from './instrument-detail.component';
import { InstrumentUpdateComponent } from './instrument-update.component';
import { InstrumentDeleteDialogComponent } from './instrument-delete-dialog.component';
import { instrumentRoute } from './instrument.route';

@NgModule({
  imports: [Notgen3SharedModule, RouterModule.forChild(instrumentRoute)],
  declarations: [InstrumentComponent, InstrumentDetailComponent, InstrumentUpdateComponent, InstrumentDeleteDialogComponent],
  entryComponents: [InstrumentDeleteDialogComponent]
})
export class Notgen3InstrumentModule {}
