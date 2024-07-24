import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailable(): Promise<Observable<AxiosResponse<LocationDto[]>>> {
    return this.httpService.get(
      'http://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.csv',
    );
  }
}
