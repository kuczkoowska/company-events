import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Feedback} from './feedback.entity';
import {CreateFeedbackDto} from './create-feedback.dto';

// import axios or HttpService if you want to check event existence

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private readonly repo: Repository<Feedback>,
    ) {
    }

    async create(dto: CreateFeedbackDto) {
        // Optionally: check if event exists by calling events microservice
        // Example (pseudo-code):
        // const event = await this.eventsClient.getEventById(dto.eventId);
        // if (!event) throw new NotFoundException('Event not found');

        // userId should come from the authenticated request, not from client input
        const feedback = this.repo.create({
            ...dto,
            eventId: dto.eventId,
            userId: dto.userId, // get from request context in real app
        });
        return this.repo.save(feedback);
    }

    findAll() {
        return this.repo.find();
    }
}