import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './create-feedback.dto';
import {Resource, Roles} from 'nest-keycloak-connect';

import {Request} from 'express';

interface KeycloakRequest extends Request {
    user?: { sub: string };
}

@Resource('feedback')
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {
    }


    @Post()
    @Roles({roles: ['realm:admin', 'realm:user']})
    async create(@Body() dto: CreateFeedbackDto, @Req() req: KeycloakRequest) {
        const userId = req.user?.sub ?? '';
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.feedbackService.create({...dto, userId});
    }

    @Get()
    @Roles({roles: ['realm:admin', 'realm:user']})
    findAll() {
        return this.feedbackService.findAll();
    }
}
