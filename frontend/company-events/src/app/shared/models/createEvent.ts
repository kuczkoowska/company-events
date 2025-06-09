import {FormControl} from '@angular/forms';

export interface ICreateEventForm {
  name: FormControl<string>;
  date: FormControl<Date | null>;
  eventStart: FormControl<string>;
  eventEnd: FormControl<string>;
  roomId: FormControl<string>;
  description: FormControl<string | null>;
  tags: FormControl<string[] | null>;
  maxParticipants: FormControl<number | null>;
}

export interface createEvent {
  name: string;
  date: Date;
  eventStart: string;
  eventEnd: string;
  location: string;
  description: string;
  tags?: string[];
  maxParticipants?: number;
}
