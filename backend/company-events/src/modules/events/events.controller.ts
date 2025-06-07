import {Controller, Get, Param, Post, Body, UseGuards, Req} from '@nestjs/common';
import { EventsService } from "./events.service";
import { Event } from "./entities/event.entity";
import { CreateEventDto } from "./create-event.dto";
import {Roles} from "nest-keycloak-connect";
import { KeycloakAuthGuard } from "../../auth/keycloak-auth.guard";


@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}


    @Get()
    // @Roles({ roles: ['admin', 'user'] })
    async findAll(): Promise<Event[]> {
        return this.eventsService.findAllEvents();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Event> {
        const event = await this.eventsService.findEventById(id);
        if (!event) {
            throw new Error(`Event with ID ${id} not found`);
        }
        return event;
    }

    @Get('upcoming')
    async findUpcoming(): Promise<Event[]> {
        return this.eventsService.findUpcomingEvents();
    }

    @Get('past')
    findPast(): Promise<Event[]> {
        return this.eventsService.findPastEvents();
    }

    @Get('on-going')
    findOngoing(): Promise<Event[]> {
        return this.eventsService.findOnGoingEvents();
    }

    @Get('search/:tags')
    async search(@Param('tags') tag: string): Promise<Event[]> {
        return this.eventsService.searchEventsByTags(tag);
    }

    @Post()
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Req() req: any
    ) {
        const userId = req.user.sub; // Keycloak user ID from the JWT token
        return this.eventsService.createEvent(createEventDto, userId);
    }
}