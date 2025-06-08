import {Controller, Get} from "@nestjs/common";
import {Public} from "nest-keycloak-connect";

@Controller('health')
export class HealthController {
    @Get()
    @Public() // Make sure to add a Public decorator or exclude from auth
    health() {
        return {status: 'ok'};
    }
}