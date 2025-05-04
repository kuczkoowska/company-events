export interface IEvent {
    id: number;
    name: string;
    date: Date;
    eventStart: string;
    eventEnd: string;
    location: string;
    organizer: string;
    participants: string[];
    description: string;
}
