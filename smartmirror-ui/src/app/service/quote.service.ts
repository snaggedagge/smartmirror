import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Quote} from "../model/quote";
import * as quotes from '../../assets/quotes.json';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  data: Quote[] = quotes;
  public getQuote() : Observable<Quote> {
    return of(this.data[this.getRandomInt(this.data.length)]);
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
