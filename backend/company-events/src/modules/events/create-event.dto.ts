export class CreateEventDto {
    name: string;
    date: Date;
    eventStart: string;
    eventEnd: string;
    description: string;
    tags?: string[];
    maxParticipants?: number;
    roomId: number;
    organizerId: string;
}
