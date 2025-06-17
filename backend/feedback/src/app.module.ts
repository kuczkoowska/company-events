import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {HealthController} from './health.controller';
import {AppService} from './app.service';

import {KeycloakModule} from "./auth/keycloak.service";
import * as dotenv from 'dotenv';
import {Feedback} from './modules/feedback.entity';

dotenv.config();
console.log('DB HOST:', process.env.DB_HOST);
console.log('ENV:', process.env);

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'events_db',
            entities: [Feedback],
            synchronize: true,
            logging: true,
            retryAttempts: 10,
            retryDelay: 3000,
            extra: {
                hostAddress: 'db'
            }
        }),

        KeycloakModule,
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {
}