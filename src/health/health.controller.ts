import { Controller, Get, UseGuards } from "@nestjs/common";
import { HealthService } from "./health.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.healthService.getHello();
  }
}
