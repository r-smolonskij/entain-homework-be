import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  constructor(private readonly http: HttpService) {}

  async get<T>(path: string, params?: Record<string, string | number>) {
    try {
      const url = `${process.env.TMDB_BASE_URL}${path}`;
      const response = await firstValueFrom(
        this.http.get<T>(url, {
          params,
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            Accept: 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error: any) {
      const status =
        error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error?.response?.data?.message ?? 'TMDB request failed';
      throw new HttpException(message, status);
    }
  }
}
