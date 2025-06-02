import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, LessThanOrEqual, MoreThan, Repository} from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './create-event.dto';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>
    ) {}


    async createEvent(createEventDto: CreateEventDto, userId: string): Promise<Event> {
        const room = await this.roomRepository.findOne({ where: { id: createEventDto.roomId }});
        if (!room) {
            throw new Error('Room not found');
        }

        const event: Event = this.eventRepository.create({
            ...createEventDto,
            organizerId: userId,
            participants: [],
            location: room
        });

        return await this.eventRepository.save(event);
    }

    async findAllEvents(): Promise<Event[]> {
        return await this.eventRepository.find();
    }

    async findEventById(id: number): Promise<Event | null> {
        return await this.eventRepository.findOne({ where: { id } });
    }

    async findUpcomingEvents(): Promise<Event[]> {
        const currentDate = new Date();
        return await this.eventRepository.find({
            where: {
                date: MoreThan(currentDate),
            },
            order: {
                date: 'ASC',
            },
        });
    }

    findPastEvents(): Promise<Event[]> {
        const currentDate = new Date();
        return this.eventRepository.find({
            where: {
                date: MoreThan(currentDate),
            },
            order: {
                date: 'DESC',
            },
        });
    }

    findOnGoingEvents(): Promise<Event[]> {
        const currentDate = new Date();
        const currentTime = new Date().getTime().toString();
        return this.eventRepository.find({
            where: {
                date: LessThanOrEqual(currentDate),
                eventStart: LessThanOrEqual(currentTime), // Compare with current date and time
                eventEnd: MoreThan(currentTime),
            },
            order: {
                date: 'ASC',
            },
        });
    }

    searchEventsByTags(tag: string): Promise<Event[]> {
        return this.eventRepository.find({
            where: {
                tags: In([tag]),
            },
            order: {
                date: 'ASC',
            },
        })
    }

}