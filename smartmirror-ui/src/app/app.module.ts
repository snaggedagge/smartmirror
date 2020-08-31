import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { WeatherPrognosisComponent } from './components/weather-prognosis/weather-prognosis.component';
import {NgxArcTextModule} from "ngx-arc-text";
import {MotionDetectionComponent} from "./components/motion-detection/motion-detection.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainPageComponent} from "./views/main-page/main-page.component";
import {RouterModule} from "@angular/router";
import {LeftPageComponent} from "./views/left-page/left-page.component";
import {RightPageComponent} from "./views/right-page/right-page.component";

@NgModule({
  declarations: [
    AppComponent,
    WeatherPrognosisComponent,
    MotionDetectionComponent,
    MainPageComponent,
    LeftPageComponent,
    RightPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgxArcTextModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/0' },
      { path: '0', component: MainPageComponent, data: {animation: 'HomePage'} },
      { path: '-1', component: LeftPageComponent, data: {animation: 'LeftPage'} },
      { path: '1', component: RightPageComponent, data: {animation: 'RightPage'} },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
