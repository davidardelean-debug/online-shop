import { Location } from "../domain/location.entity";
import { LocationDto } from "../dto/location.dto";

export class LocationMapper{

    static toDto(location: Location) :LocationDto{

        const {id, name, country, city, county, street} = location;
        return {id, name, country, city, county, street};
    }

    static toEntity(locationDto: LocationDto): Location{
        const {id, name, country, city, county, street} = locationDto;
        return {id, name, country, city, county, street};
    }
}