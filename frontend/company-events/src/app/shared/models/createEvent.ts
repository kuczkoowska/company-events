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
