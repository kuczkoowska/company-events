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
    @Roles({roles: ['admin', 'user']})
    async findAll(): Promise<Event[]> {
        return this.eventsService.findAllEvents();
    }

    @Get('upcoming')
    @Roles({roles: ['admin', 'user']})
    async findUpcoming(): Promise<Event[]> {
        return this.eventsService.findUpcomingEvents();
    }

    @Get('past')
    @Roles({roles: ['admin', 'user']})
    findPast(): Promise<Event[]> {
        return this.eventsService.findPastEvents();
    }

    @Get('on-going')
    @Roles({roles: ['admin', 'user']})
    findOngoing(): Promise<Event[]> {
        return this.eventsService.findOnGoingEvents();
    }

    @Get('search/:tags')
    @Roles({roles: ['admin', 'user']})
    async search(@Param('tags') tag: string): Promise<Event[]> {
        return this.eventsService.searchEventsByTags(tag);
    }

    @Get(':id')
    @Roles({roles: ['admin', 'user']})
    async findOne(@Param('id') id: number): Promise<Event> {
        const event = await this.eventsService.findEventById(id);
        if (!event) {
            throw new Error(`Event with ID ${id} not found`);
        }
        return event;
    }

    @Post()
    @Roles({roles: ['admin']}) // Tylko admin może tworzyć eventy
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Req() req: any
    ) {
        const userId = req.user?.sub; // Keycloak ID
        return this.eventsService.createEvent(createEventDto, userId);
    }
}
