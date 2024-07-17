import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "../domain/location.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocationRepository{
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>
    ){}
}