import {Injectable} from "@nestjs/common";
import { CreateRoomDto } from "./create-room.dto";
import {Repository} from "typeorm";
import {Room} from "../../entities/room.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomsRepository: Repository<Room>
    ) {}

    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        const room = this.roomsRepository.create(createRoomDto);
        return await this.roomsRepository.save(room);
    }

    async findAllRooms(): Promise<Room[]> {
        return await this.roomsRepository.find();
    }
}