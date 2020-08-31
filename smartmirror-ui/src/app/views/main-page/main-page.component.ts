import {Component, NgZone, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WebsocketService} from "../../service/websocket.service";
import {QuoteService} from "../../service/quote.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { AlexaService } from 'src/app/service/alexa.service';

declare var handTrack:  any;
declare var JSON:  any;
export let model;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('appear', [
      // ...
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0.0,
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ]),
    ]),
  ]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  options = { hour: '2-digit', minute: '2-digit'};

  time = new Date().toLocaleString("sv-FI", this.options);
  date = new Intl.DateTimeFormat('en-FI', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
  quote = "";
  author = "";

  quoteHidden = true;

  displayingBottomToolbar = false;
  displayingViewport = false;

  constructor(private zone: NgZone,
              private quoteService: QuoteService,
              private alexaService: AlexaService) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.time = new Date().toLocaleString("sv-FI", this.options);
      }, 10000);
      setInterval(() => {
        this.updateDailyQuote();
      }, 1000*60*60); // Once every hour for now
    });
  }

  ngOnInit(): void {
    this.updateDailyQuote();
  }

  public ngAfterViewInit() {
    const self = this;
    this.alexaService.getRenderers().subscribe(renderers => {
      var viewportObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
          const element : any = mutationRecord.target
            if (element.style.visibility === 'visible') {
              self.displayingViewport = true;
            }
            else {
              self.displayingViewport = false;
            }
        });    
      });
      viewportObserver.observe(renderers[0], { attributes : true, attributeFilter : ['style'] });

      var tvOverlayLandscapeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
          const element : any = mutationRecord.target
            if (element.style.opacity === '1') {
              self.displayingBottomToolbar = true;
            }
            else {
              self.displayingBottomToolbar = false;
            }
        });    
      });
      tvOverlayLandscapeObserver.observe(renderers[2], { attributes : true, attributeFilter : ['style'] });
    });
  }

  updateDailyQuote() {
    this.quoteService.getQuote().subscribe(quote => {
      this.quote = quote.quote;
      this.author = quote.author;

      setTimeout(() => {
        // With the motion detection stuff quote became weird if it didnt wait before rendering
        this.quoteHidden = false;
      }, 200); 
      // 89 is kinda good, 80 limit?
    })
  }
}
