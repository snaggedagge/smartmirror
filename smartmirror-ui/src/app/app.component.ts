import {Component, OnInit} from '@angular/core';
import {WeatherIconService} from "./weather/service/weather-icon.service";
import {WeatherService} from "./weather/service/weather.service";
import {WeatherReport} from "./weather/model/weather-report";

import {WebsocketService} from "./websocket/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  message = 'smartmirror-ui';

  weatherReport : WeatherReport;

  constructor(public weatherIconService: WeatherIconService,
              private weatherService: WeatherService,
              private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.updateData();

    this.websocketService.onMessage('/topic/update').subscribe(message => {
      this.updateData();
    });
  }

  updateData() {
    this.weatherService.getWeather().subscribe(data => {
      this.weatherReport = data;
    });
  }
}
