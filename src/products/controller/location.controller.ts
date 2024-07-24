import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RemoteLocationDto } from '../dto/location-from-remote.dto';
import { toRemoteLocationDto } from '../mapper/location-from-remote.mapper';
import { LocationService } from '../service/location.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @Get('available')
  async getAvailable(): Promise<RemoteLocationDto[]> {
    const locations = await this.locationService.getAvailable();

    return locations.map(location => toRemoteLocationDto(location));
  }
}
