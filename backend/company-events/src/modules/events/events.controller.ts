import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {EventsService} from "./events.service";
import {Event} from "./entities/event.entity";
import {CreateEventDto} from "./create-event.dto";
import {Resource, Roles} from "nest-keycloak-connect";


@Resource('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    findAll(): Promise<Event[]> {
        return this.eventsService.findAllEvents();
    }

    @Get('upcoming')
    @Roles({roles: ['realm:admin', 'realm:user']})
    findUpcoming(): Promise<Event[]> {
        return this.eventsService.findUpcomingEvents();
    }

    @Get('past')
    @Roles({roles: ['realm:admin', 'realm:user']})
    findPast(): Promise<Event[]> {
        return this.eventsService.findPastEvents();
    }

    @Get('ongoing')
    @Roles({roles: ['realm:admin', 'realm:user']})
    findOngoing(): Promise<Event[]> {
        return this.eventsService.findOnGoingEvents();
    }

    @Get('search/:tags')
    @Roles({roles: ['realm:admin', 'realm:user']})
    search(@Param('tags') tag: string): Promise<Event[]> {
        return this.eventsService.searchEventsByTags(tag);
    }

    @Get(':id')
    @Roles({roles: ['realm:admin', 'realm:user']})
    findOne(@Param('id') id: number): Promise<Event> {
        return this.eventsService.findEventById(id);
    }

    @Post()
    @Roles({roles: ['realm:admin']})
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Req() req: any
    ): Promise<Event> {
        const userId = req.user?.sub; // Keycloak ID
        return this.eventsService.createEvent(createEventDto, userId);
    }
}
