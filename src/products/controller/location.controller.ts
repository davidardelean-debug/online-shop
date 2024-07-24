import { Controller, Get } from '@nestjs/common';
import { LocationService } from '../service/location.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationService) {}

  @Get('available')
  async getAvailable() {
    return this.locationService.getAvailable();
  }
}
