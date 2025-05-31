import {Body, Controller, Get, Post} from "@nestjs/common";
import {RoomsService} from "./rooms.service";
import {Room} from "../../entities/room.entity";
import {CreateRoomDto} from "./create-room.dto";

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    async findAll(): Promise<Room[]> {
        return this.roomsService.findAllRooms();
    }

    @Post()
    async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomsService.createRoom(createRoomDto);
    }
}