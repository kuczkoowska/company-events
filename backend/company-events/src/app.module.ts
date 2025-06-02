import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './modules/events/events.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { KeycloakModule } from "./auth/keycloak.service";
import { Event } from './modules/events/entities/event.entity';
import { Room } from './modules/rooms/entities/room.entity';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('DB HOST:', process.env.DB_HOST);
console.log('ENV:', process.env);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Event, Room],
      synchronize: true,
      logging: true,
      extra: {
        hostAddress: process.env.DB_HOST // Force IPv4
      }
    }),

    EventsModule,
    RoomsModule,
    KeycloakModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}