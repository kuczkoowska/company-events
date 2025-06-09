import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Room} from './entities/room.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>
    ) {
    }

    async findAll(): Promise<Room[]> {
        return await this.roomRepository.find();
    }

    async findOne(id: number): Promise<Room> {
        const room = await this.roomRepository.findOne({where: {id}});
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }

    async create(room: Partial<Room>): Promise<Room> {
        const newRoom = this.roomRepository.create(room);
        return await this.roomRepository.save(newRoom);
    }

    async update(id: number, room: Partial<Room>): Promise<Room> {
        await this.roomRepository.update(id, room);
        return await this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.findOne(id);
        await this.roomRepository.delete(id);
    }

    async getRoomEvents(roomId: number): Promise<Room> {
        const room = await this.roomRepository.findOne({
            where: {id: roomId},
            relations: ['events']
        });

        if (!room) {
            throw new NotFoundException(`Room with ID ${roomId} not found`);
        }

        return room;
    }
}