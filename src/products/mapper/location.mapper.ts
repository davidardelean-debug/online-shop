import { Location } from '../domain/location.entity';
import { LocationDto } from '../dto/location.dto';

export function toLocationDto(location: Location): LocationDto {
  const { id, name, country, city, county, street } = location;
  return { id, name, country, city, county, street };
}

export function toLocationEntity(locationDto: LocationDto): Location {
  const { id, name, country, city, county, street } = locationDto;
  return { id, name, country, city, county, street };
}
