import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Recipe } from '../model/recipe.model';
import { BehaviorSubject, catchError, concatMap, EMPTY, Observable, retryWhen, startWith, switchAll, tap, timer } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const WS_ENDPOINT = environment.wsEndpoint;
const RECONNECT_INTERVAL = 3000;

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  private socket$: WebSocketSubject<Recipe[]> | undefined;
  private messagesSubject$ = new BehaviorSubject<Observable<Recipe[]>>(EMPTY);
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    startWith([]),
    catchError(e => { throw e })
  )

  constructor() { }

  getNewWebSocket(): WebSocketSubject<Recipe[]> {
    return webSocket(
      {
        url: WS_ENDPOINT,
        closeObserver: {
          next: () => {
            console.log('[RealTimeService]: connection closed');
            this.socket$ = undefined;
            this.connect({ recconent: true })
          }
        }
      }
    )
  }

  sendMessage(msg: Recipe[]) {
    this.socket$?.next(msg);
  }
  close() {
    this.socket$?.complete()
  }
  connect(cfg: { recconent: boolean } = { recconent: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const message = this.socket$.pipe(
        cfg.recconent ? this.reconnect.bind(this) : o => o,
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY)
      )
      this.messagesSubject$.next(message)
    }
  }

  reconnect(observable: Observable<Recipe[]>): Observable<Recipe[]> {
    return observable.pipe(
      catchError((error, caught) => {
        console.log('[Data Service] Try to reconnect', error);
        return timer(RECONNECT_INTERVAL).pipe(
          concatMap(() => caught)
        )
      })
    )
  }

}
