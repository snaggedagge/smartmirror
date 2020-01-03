import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WeatherReport} from "../model/weather-report";
import {Observable} from "rxjs/internal/Observable";
import {Quote} from "../model/quote";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  public getQuote() : Observable<Quote> {
    return this.http.get<Quote>(environment.apiBase + "/api/quote");
  }
}
