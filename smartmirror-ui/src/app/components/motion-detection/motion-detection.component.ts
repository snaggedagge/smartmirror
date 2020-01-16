import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WeatherReport} from "../../model/weather-report";
import {WeatherIconService} from "../../service/weather-icon.service";
import {WeatherService} from "../../service/weather.service";
import {WebsocketService} from "../../service/websocket.service";

import {MotionService} from "../../service/motion.service";
import {environment} from "../../../environments/environment";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

declare var handTrack:  any;
declare var JSON:  any;
export let model;

@Component({
  selector: 'app-motion-detection',
  templateUrl: './motion-detection.component.html',
  styleUrls: ['./motion-detection.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', group([
        query(':enter', [
          style({
            transform: 'translateX(100%)'
          }),
          animate('1s ease-out', style({'font-weight': 'bold'}))
        ]),
        query(':leave', [
          animate('1s ease-out', style({
            transform: 'translateX(-100%)'
          }))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            transform: 'translateX(-100%)'
          }),
          animate('1s ease-out', style({'font-weight': 'bold'}))
        ]),
        query(':leave', [
          animate('1s ease-out', style({
            transform: 'translateX(100%)'
          }))
        ])
      ]))
    ])
  ]
})
export class MotionDetectionComponent implements OnInit {

  currentIndex = 2;
  showImage = true;

  slides = [
    {image: 'assets/demo/1.jpg', description: 'Image 00'},
    {image: 'assets/demo/2.jpg', description: 'Image 01'},
    {image: 'assets/demo/2.jpg', description: 'Image 01'},
    {image: 'assets/demo/4.jpg', description: 'Image 02'},
    {image: 'assets/demo/5.jpg', description: 'Image 03'}
  ];

  motionDetectionDebug = environment.motionDetectionDebug;

  @ViewChild("video", {static: false})
  public video: ElementRef;

  @ViewChild("canvas", {static: false})
  public canvas: ElementRef;

  modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
  };

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.currentIndex;
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : this.currentIndex;
  }


  constructor(private motionService: MotionService,
              private websocketService: WebsocketService) { }

  preloadImages() {
    this.slides.forEach(slide => {
      (new Image()).src = slide.image;
    });
  }


  ngOnInit(): void {
    var self = this;
    console.log("Loading model");
    this.preloadImages();
    console.log("Loading model");
    handTrack.load(this.modelParams).then(lmodel => {
      model = lmodel;
      console.log("Starting Video");
      handTrack.startVideo(this.video.nativeElement).then(function (status) {
        if (status) {
          setInterval(() => {
            self.capture();
          }, 100);

          self.websocketService.onMessage('/topic/motion').subscribe(message => {
            let jsonMessage = JSON.parse(message);
            if(jsonMessage.movementDirection === 'LEFT') {
              self.nextSlide();
              console.log("LEFT");
            }
            if(jsonMessage.movementDirection === 'RIGHT') {
              self.prevSlide();
              console.log("RIGHT");
            }
            console.log(jsonMessage);
          });

        } else {
          console.log("Failed to start video ");
        }
      });
    });
  }

  public capture() {
    var self = this;

    model.detect(self.video.nativeElement).then(predictions => {
      if(predictions.length > 0) {
        self.motionService.notifyHandMotion(predictions);
      }

      if(self.motionDetectionDebug) {
        model.renderPredictions(predictions, self.canvas.nativeElement, self.canvas.nativeElement.getContext("2d"), self.video.nativeElement);
      }
    });
  }
}
