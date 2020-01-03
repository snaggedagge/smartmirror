import {Injectable, OnDestroy} from "@angular/core";
import {CompatClient, Stomp, StompSubscription} from "@stomp/stompjs";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() {
  }

  onMessage(topic: string): Observable<any> {
    return new Observable<any>(observer => {
      var socket = new SockJS(environment.apiBase + '/update');
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        //console.log('Connected: ' + frame);
        const subscription: StompSubscription = stompClient.subscribe('/topic/update', function (message) {
          observer.next(message.body);
        });
        return () => stompClient.unsubscribe(subscription.id);
      });
    });
  }

}
