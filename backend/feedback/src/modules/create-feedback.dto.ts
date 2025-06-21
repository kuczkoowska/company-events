export class CreateFeedbackDto {
    eventId: string;
    userId: string;
    rating: number;
    comment?: string;
}
