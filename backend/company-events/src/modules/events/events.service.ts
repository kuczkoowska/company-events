import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, LessThan, LessThanOrEqual, MoreThan, Repository} from 'typeorm';
import {Event} from './entities/event.entity';
import {CreateEventDto} from './create-event.dto';
import {Room} from '../rooms/entities/room.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
        @InjectRepository(Room)
        private roomRepository: Repository<Room>
    ) {
    }


    async createEvent(createEventDto: CreateEventDto, userId: string): Promise<Event> {
        const room = await this.roomRepository.findOne({where: {id: createEventDto.roomId}});
        if (!room) {
            throw new NotFoundException(`Room with ID ${createEventDto.roomId} not found`);
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

    async findEventById(id: number): Promise<Event> {
        const event = await this.eventRepository.findOne({where: {id}});
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
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

    async findPastEvents(): Promise<Event[]> {
        const currentDate = new Date();
        return await this.eventRepository.find({
            where: {
                date: LessThan(currentDate),
            },
            order: {
                date: 'DESC',
            },
        });
    }

    async findOnGoingEvents(): Promise<Event[]> {
        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0];

        return await this.eventRepository.find({
            where: {
                date: LessThanOrEqual(now),
                eventStart: LessThanOrEqual(currentTime),
                eventEnd: MoreThan(currentTime),
            },
            order: {
                date: 'ASC',
            },
        });
    }

    async searchEventsByTags(tag: string): Promise<Event[]> {
        return await this.eventRepository.find({
            where: {
                tags: In([tag]),
            },
            order: {
                date: 'ASC',
            },
        });
    }

}