import {Controller, Get} from "@nestjs/common";
import {Public} from "nest-keycloak-connect";

@Controller('health')
export class HealthController {
    @Get()
    @Public()
    health() {
        return {status: 'ok'};
    }
}