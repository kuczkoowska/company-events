import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Event} from "../../events/entities/event.entity";

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

    @OneToMany(() => Event, event => event.location)
    events: Event[];
}