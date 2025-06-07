import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { Event } from "./entities/event.entity";
import {Room} from "../rooms/entities/room.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Event, Room])],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}