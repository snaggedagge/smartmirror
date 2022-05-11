import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WeatherReport} from "../model/weather-report";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class MotionService {

  constructor(private http: HttpClient) { }

  public notifyHandMotion(motion:any) {
    this.http.post(environment.apiBase + "/motion/hand", motion).subscribe();
  }
}
