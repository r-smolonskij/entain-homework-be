import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmbd/tmdb.service';
import { MovieDetails, MoviesResponse } from './interfaces/movies.interface';

@Injectable()
export class MoviesService {
  constructor(private readonly tmbd: TmdbService) {}

  findAll(page?: number): Promise<MoviesResponse> {
    const params = page ? { page } : undefined;
    return this.tmbd.get<MoviesResponse>(`/discover/movie`, params);
  }

  findOne(id: number): Promise<MovieDetails> {
    return this.tmbd.get<MovieDetails>(`/movie/${id}`, {
      append_to_response: 'images',
    });
  }
}
