import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Notgen3SharedModule } from 'app/shared/shared.module';
import { Notgen3CoreModule } from 'app/core/core.module';
import { Notgen3AppRoutingModule } from './app-routing.module';
import { Notgen3HomeModule } from './home/home.module';
import { Notgen3EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Notgen3SharedModule,
    Notgen3CoreModule,
    Notgen3HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Notgen3EntityModule,
    Notgen3AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class Notgen3AppModule {}
