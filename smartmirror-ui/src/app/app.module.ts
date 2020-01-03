import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { WeatherPrognosisComponent } from './weather-prognosis/weather-prognosis.component';
import {NgxArcTextModule} from "ngx-arc-text";

@NgModule({
  declarations: [
    AppComponent,
    WeatherPrognosisComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgxArcTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
