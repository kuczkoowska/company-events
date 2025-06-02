import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Room} from "../../rooms/entities/room.entity";

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'time' })
    eventStart: string;

    @Column({ type: 'time' })
    eventEnd: string;

    @ManyToOne(() => Room, room => room.events, { eager: true })
    @JoinColumn({ name: 'roomId' })
    location: Room;

    @Column()
    organizerId: string;

    @Column("text", { array: true })
    participants: string[];

    @Column()
    description: string;

    @Column('text', { array: true, nullable: true })
    tags: string[];

    @Column({ nullable: true })
    maxParticipants: number;
}