import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notgen3SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Notgen3SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class Notgen3HomeModule {}
