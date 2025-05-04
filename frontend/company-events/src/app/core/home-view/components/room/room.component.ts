import {Component, Input, signal, WritableSignal} from '@angular/core';
import {IRoom} from '@company/shared/models/room.interface';
import {IEvent} from '@company/shared/models/event.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @Input() room: IRoom;
  public visible: WritableSignal<boolean> = signal(false);
  public clicked: WritableSignal<boolean> = signal(false);

  private getEventTime(event: IEvent): { startTime: Date; endTime: Date } {
    const now = new Date();
    const [startHour, startMinute] = event.eventStart.split(':').map(Number);
    const [endHour, endMinute] = event.eventEnd.split(':').map(Number);

    return {
      startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute),
      endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute)
    };
  }

  getTodayEvents(room: IRoom): IEvent[] {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    return room.events
      .filter(event => event.date.toISOString().split('T')[0] === today)
      .sort((a, b) => {
        const [aHour, aMin] = a.eventStart.split(':').map(Number);
        const [bHour, bMin] = b.eventStart.split(':').map(Number);
        return (aHour * 60 + aMin) - (bHour * 60 + bMin);
      });
  }

  getUpcomingEvents(room: IRoom): IEvent[] {
    const now = new Date();
    return this.getTodayEvents(room).filter(event => {
      const { startTime } = this.getEventTime(event);
      return startTime > now;
    });
  }

  isEventOngoing(event: IEvent): boolean {
    const now = new Date();
    const { startTime, endTime } = this.getEventTime(event);
    return now >= startTime && now <= endTime;
  }

  getCurrentOngoingEvent(room: IRoom): IEvent | null {
    return this.getTodayEvents(room).find(event => this.isEventOngoing(event)) || null;
  }

  isRoomFree(room: IRoom): boolean {
    return !this.getCurrentOngoingEvent(room);
  }

  getCurrentEvent(room: IRoom): { eventStart: string; eventEnd: string } | null {
    const event = this.getCurrentOngoingEvent(room);
    return event ? { eventStart: event.eventStart, eventEnd: event.eventEnd } : null;
  }

  public open(): void {
    this.visible.set(true);
  }

  public close(): void {
    this.visible.set(false);
  }

  onClick(): void {
    this.clicked.set(true);
  }

  onCancel(): void {
    this.clicked.set(false);
  }
}
