import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherIconService {
  iconArray = {'01d': 'sunny',
  '01n': 'mostlycloudy', // Moon
    '02d' : 'mostlycloudy',
    '02n' : 'mostlycloudy', // Moon behind clouds
    '03d' : 'cloudy',
    '03n' : 'cloudy',
    '04d' : 'rainyclouds',
    '04n' : 'rainyclouds',
    '10d' : 'rain', // Rain and sun
    '10n' : 'rain', // Rain and moon
    '13d' : 'snow',
    '13n' : 'snow',
     };

  constructor() { }

  public getCssClass(imageName: string) : string {
    let res = this.iconArray[imageName];
    if (res == null) {
      return 'tstorms';
    }
    return res;
  }
}
