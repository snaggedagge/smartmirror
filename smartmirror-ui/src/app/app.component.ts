import {Component, ElementRef, NgZone, OnInit, Renderer2} from '@angular/core';
import {WeatherIconService} from "./service/weather-icon.service";
import {WeatherService} from "./service/weather.service";
import {WeatherReport} from "./model/weather-report";

import {WebsocketService} from "./websocket/websocket.service";
import {QuoteService} from "./service/quote.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  options = { hour: '2-digit', minute: '2-digit'};

  time = new Date().toLocaleString("sv-FI", this.options);
  quote = "I am king";
  author = "Dag K";

  constructor(private zone: NgZone,
              private quoteService: QuoteService) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.time = new Date().toLocaleString("sv-FI", this.options);
      }, 500);
      setInterval(() => {
        this.updateDailyQuote();
      }, 1000*60*60); // Once every hour for now
    });
  }

  ngOnInit(): void {
    this.updateDailyQuote();
  }

  updateDailyQuote() {
    this.quoteService.getQuote().subscribe(quote => {
      this.quote = quote.quote;
      this.author = quote.author;
    })
  }

}
