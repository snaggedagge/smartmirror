import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherIconService {
  iconArray: any = {'01d': 'sunny',
  '01n': 'aws-sunny-cloudy', // Moon
    '02d' : 'aws-sunny-cloudy',
    '02n' : 'aws-sunny-cloudy', // Moon behind clouds
    '03d' : 'aws-cloudy',
    '03n' : 'aws-cloudy',
    '04d' : 'aws-rainy-clouds',
    '04n' : 'aws-rainy-clouds',
    '10d' : 'aws-rainy-sunshine', // Rain and sun
    '10n' : 'aws-rainy', // Rain and moon
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
