import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WeatherReport} from "../model/weather-report";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getWeather() : Observable<WeatherReport> {
    return this.http.get<WeatherReport>(environment.apiBase + "/api/weather");
  }
}
