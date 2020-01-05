import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { WeatherPrognosisComponent } from './components/weather-prognosis/weather-prognosis.component';
import {NgxArcTextModule} from "ngx-arc-text";
import {MotionDetectionComponent} from "./components/motion-detection/motion-detection.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    WeatherPrognosisComponent,
    MotionDetectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgxArcTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
