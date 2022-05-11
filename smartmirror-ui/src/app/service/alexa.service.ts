import {Injectable} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlexaService {

  private renderers:any = []

  public setRenderers(renderers: any[]) {
    this.renderers = renderers;
  }

  public getRenderers(): Observable<any[]> {
    var self=this;
    return new Observable<any>(observer => {
      (async () => {
        while(!self.renderers.length) {
          await new Promise( resolve => setTimeout(resolve, 2000) );
        }
        observer.next(self.renderers);
        observer.complete();
      })();
    });
  }
}
