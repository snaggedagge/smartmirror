export class Weather {
  constructor(public temp: number,
              public minTemp: number,
              public maxTemp: number,
              public humidity: number,
              public weather: string,
              public weatherDescription: string,
              public iconName: string,
              public cloudinessInPercent: number,
              public windSpeed: number,
              public windDegrees: number,
              public rainVolumeThreeHours: number,
              public snowVolumeThreeHours: number,
              public time: string,
              public day: string) {

  }
}
