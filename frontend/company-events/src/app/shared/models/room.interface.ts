import {IEvent} from '@company/shared/models/event.interface';

export interface IRoom {
  id: number;
  name: string;
  capacity: number;
  events: IEvent[];
}
