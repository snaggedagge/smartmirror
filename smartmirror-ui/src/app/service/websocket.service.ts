import {Injectable, OnDestroy} from "@angular/core";
import {CompatClient, IFrame, Stomp, StompSubscription} from "@stomp/stompjs";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";
import * as SockJS from "sockjs-client";
import {Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subscriptions = new Map<string, Subscriber<any>>();
  isConnected = false;
  isConnecting = false;
  stompClient!: CompatClient;

  constructor() {
    this.reconnect(false, 5000);
  }

  async reconnect(activateSubscriptions: boolean, reconnectInterval:number) {
    var self = this;
    let reconInv = setInterval(() => {
      var socket = new SockJS(environment.apiBase + '/websocket');
      if(!self.isConnecting) {
        self.isConnecting = true;
        self.stompClient = Stomp.over(socket);
        //self.stompClient.debug = (msg => {});
        console.log("Trying to connect to websocket!");
        self.stompClient.connect({}, (frame:any) => {
            clearInterval(reconInv);
            console.log("Is connected to websocket!");
            self.isConnected = true;
            self.isConnecting = false;

            if (activateSubscriptions) {
              self.subscriptions.forEach((subscriber, topic)=> {
                self.subscribe(subscriber, topic);
              })
            }

          }, () => {
            self.isConnected = false;
            self.isConnecting = false;
            self.reconnect(true, 30000);
          },
          () => {
            self.isConnected = false;
            self.isConnecting = false;
            self.reconnect(true, 30000);
          });
      }
    }, reconnectInterval);
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onMessage(topic: string): Observable<any> {
    var self=this;
    return new Observable<any>(observer => {
      self.subscribe(observer, topic);
    });
  }

  private subscribe(observer: Subscriber<any>, topic: string) {
    var self=this;
    (async () => {
      while(!self.isConnected) {
        await self.delay(10000);
      }
      self.subscriptions.set(topic, observer);

      console.log("Subscibing to topic " + topic);
      const subscription: StompSubscription = self.stompClient.subscribe(topic, function (message:any) {
        observer.next(message.body);
      });
      return () => {
        console.log("Unsubscribing");
        self.stompClient.unsubscribe(subscription.id);
      };
    })();
  }

}
