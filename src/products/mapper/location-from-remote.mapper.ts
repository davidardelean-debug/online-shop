import { RemoteLocationDto } from "../dto/location-from-remote.dto";

export function toRemoteLocationDto(object: {id, nume, diacritice, judet, auto, zip, populatie, lat, lng}): RemoteLocationDto{

    const {id, nume, diacritice, judet, auto, zip, populatie, lat, lng} = object;
    return {id, nume, diacritice, judet, auto, zip, populatie, lat, lng};

}