import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {createEvent} from '@company/shared/models/createEvent';
import {IEvent} from '@company/shared/models/event.interface';
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl: string = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`);
  }

  getUpcomingEvents(includeParticipants: boolean = false): Observable<IEvent[]> {
    const params = includeParticipants ? {includeParticipants: 'true'} : {};
    return this.http.get<IEvent[]>(`${this.apiUrl}/upcoming`, {params});
  }

  getPastEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/past`);
  }

  getOnGoingEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/ongoing`);
  }

  // searchEventsByTags(tag: string): Observable<IEvent[]> {
  //   return this.http.get<IEvent[]>(`${this.apiUrl}/search/${tag}`);
  // }

  createEvent(event: createEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.apiUrl, event);
  }
}
