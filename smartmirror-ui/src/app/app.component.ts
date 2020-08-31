import {Component, NgZone, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

import {QuoteService} from "./service/quote.service";
import {WebsocketService} from "./service/websocket.service";
import {Router, RouterOutlet} from "@angular/router";
import {slideInAnimation} from "./animations";
import {AlexaService} from './service/alexa.service';

declare var JSON:  any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  index = 0;
  platform = navigator.platform;
  @ViewChild('iframe', {static: false})
  iframe: ElementRef;

  constructor(private zone: NgZone,
              private quoteService: QuoteService,
              private websocketService: WebsocketService,
              private router: Router,
              private alexaService: AlexaService) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    this.websocketService.onMessage('/topic/motion').subscribe(message => {
      let jsonMessage = JSON.parse(message);

      if(jsonMessage.movementDirection === 'LEFT') {
        this.left();
      }
      if(jsonMessage.movementDirection === 'RIGHT') {
        this.right();
      }
    });

  }

  public ngAfterViewInit() {
    const self = this;
    this.iframe.nativeElement.onload = function () {
      self.iframe.nativeElement.contentDocument.getElementById('root').style.opacity = "  ";
      const els = self.iframe.nativeElement.contentDocument.getElementsByClassName('bg');
      if (els.length > 0) {
        els[0].style.display = 'none';
      }

      const renderer = self.iframe.nativeElement.contentDocument.getElementsByClassName('aplRendererWindow');
      for (let i=0;i<renderer.length;i++) {
        renderer[i].style.zIndex = 1;
        
      }
      self.alexaService.setRenderers(renderer);
      /*
            const renderer = self.iframe.nativeElement.contentDocument.getElementsByClassName('aplRendererWindow');

      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            if (mutationRecord.target.style.opacity === 1) {
              mutationRecord.target.style.zIndex = 1;
            }
            else {
              mutationRecord.target.style.zIndex = -1;
            }
        });    
    });
      for (let i=0;i<renderer.length;i++) {
        observer.observe(renderer[i], { attributes : true, attributeFilter : ['style'] });
      }
      */
    };
  }

  left() {
    if(this.index > -1) {
      this.index -= 1;
      this.router.navigate(['/' + this.index]);
    }
  }

  right() {
    if(this.index < 1) {
      this.index += 1;
      this.router.navigate(['/' + this.index]);
    }
  }
}
