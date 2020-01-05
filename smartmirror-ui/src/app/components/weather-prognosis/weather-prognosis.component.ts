import { Component, OnInit } from '@angular/core';
import {WeatherReport} from "../../model/weather-report";
import {WeatherIconService} from "../../service/weather-icon.service";
import {WeatherService} from "../../service/weather.service";
import {WebsocketService} from "../../service/websocket.service";

@Component({
  selector: 'app-weather-prognosis',
  templateUrl: './weather-prognosis.component.html',
  styleUrls: ['./weather-prognosis.component.scss']
})
export class WeatherPrognosisComponent implements OnInit {
  weatherReport : WeatherReport;

  constructor(public weatherIconService: WeatherIconService,
              private weatherService: WeatherService,
              private websocketService: WebsocketService) { }

  ngOnInit() {
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
