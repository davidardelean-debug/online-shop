import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailable() {
    const response = await this.httpService.axiosRef.get(
      'https://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.json',
    );
    return response.data;
  }
}
