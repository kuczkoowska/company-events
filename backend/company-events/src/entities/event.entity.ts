import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    location: string;

    @Column()
    organizer: string;

    @Column()
    participants: string[];

    @Column()
    description: string;

    @Column('text', { array: true, nullable: true })
    tags: string[];

    @Column({ nullable: true })
    maxParticipants: number;
}