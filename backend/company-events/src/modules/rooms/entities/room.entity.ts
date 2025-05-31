import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: true })
    isAvailable?: boolean;
}