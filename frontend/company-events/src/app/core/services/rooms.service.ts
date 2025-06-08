import {IRoom} from '@company/shared/models/room.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment'

@Injectable({providedIn: 'root'})

export class RoomsService {
  private apiUrl: string = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {
  }

  getAllRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.apiUrl);
  }

  getRoomById(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(`${this.apiUrl}/${id}`);
  }

  createRoom(room: Partial<IRoom>): Observable<IRoom> {
    return this.http.post<IRoom>(this.apiUrl, room);
  }

  updateRoom(id: number, room: Partial<IRoom>): Observable<IRoom> {
    return this.http.put<IRoom>(`${this.apiUrl}/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRoomEvents(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(`${this.apiUrl}/${id}/events`);
  }

}
