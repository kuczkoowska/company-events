export class CreateRoomDto {
    name: string;
    capacity: number;
    description?: string;
    isAvailable?: boolean = true;
}