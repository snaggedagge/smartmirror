import {Weather} from "./weather";

export class WeatherReport {
  constructor(public locationName: string,
              public countryCode: string,
              public weatherList: Weather) {
  }

}
