import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusWayComponent } from './bus-way/bus-way.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutedsearchComponent } from './routedsearch/routedsearch.component';
import { MaptestComponent } from './maptest/maptest.component';
import { FooterComponent } from './footer/footer.component';
import { StopSearchComponent } from './stop-search/stop-search.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    BusListComponent,
    BusWayComponent,
    RoutedsearchComponent,
    MaptestComponent,
    FooterComponent,
    StopSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDSMZX1ViYcMzY-DcBa8k_LQGb4UUQn4QM'
    })
  ],
  providers: [GoogleMapsAPIWrapper, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
