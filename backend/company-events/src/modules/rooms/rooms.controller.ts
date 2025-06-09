import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {RoomsService} from "./rooms.service";
import {Room} from "./entities/room.entity";
import {CreateRoomDto} from "./create-room.dto";
import {Resource, Roles} from "nest-keycloak-connect";

@Resource('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    findAll(): Promise<Room[]> {
        return this.roomsService.findAll();
    }

    @Post()
    @Roles({roles: ['realm:admin']})
    create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomsService.create(createRoomDto);
    }

    @Get(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    findOne(@Param('id') id: number): Promise<Room> {
        return this.roomsService.findOne(id);
    }


    @Put(':id')
    @Roles({roles: ['realm:admin']})
    update(@Param('id') id: number, @Body() roomData: Partial<Room>): Promise<Room> {
        return this.roomsService.update(id, roomData);
    }

    @Delete(':id')
    @Roles({roles: ['realm:admin']})
    delete(@Param('id') id: number): Promise<void> {
        return this.roomsService.delete(id);
    }

    @Get(':id/events')
    @Roles({roles: ['realm:admin', 'realm:user']})
    getRoomEvents(@Param('id') id: number): Promise<Room> {
        return this.roomsService.getRoomEvents(id);
    }
}