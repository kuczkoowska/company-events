import {Body, Controller, Get, Post, Put, Param, Delete} from "@nestjs/common";
import {RoomsService} from "./rooms.service";
import {Room} from "./entities/room.entity";
import {CreateRoomDto} from "./create-room.dto";
import {Roles} from 'nest-keycloak-connect';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    @Roles({ roles: ['admin', 'user'] })
    findAll(): Promise<Room[]> {
        return this.roomsService.findAll();
    }

    @Post()
    @Roles({ roles: ['admin'] })
    async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomsService.create(createRoomDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Room> {
        const room = await this.roomsService.findOne(id);
        if (!room) {
            throw new Error(`Room with ID ${id} not found`);
        }
        return room;
    }


    @Put(':id')
    async update(@Param('id') id: number, @Body() roomData: Partial<Room>): Promise<Room> {
        const updatedRoom = await this.roomsService.update(id, roomData);
        if (!updatedRoom) {
            throw new Error(`Room with ID ${id} not found`);
        }
        return updatedRoom;
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.roomsService.delete(id);
    }

    @Get(':id/events')
    async getRoomEvents(@Param('id') id: number): Promise<Room> {
        const room = await this.roomsService.getRoomEvents(id);
        if (!room) {
            throw new Error(`Room with ID ${id} not found`);
        }
        return room;
    }
}