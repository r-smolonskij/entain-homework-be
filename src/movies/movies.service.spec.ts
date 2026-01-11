import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TmdbService } from '../tmbd/tmdb.service';

describe('MoviesService', () => {
  let service: MoviesService;
  const tmdbService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: TmdbService, useValue: tmdbService },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    tmdbService.get.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll calls TMDB discover endpoint', async () => {
    const response = { results: [] };
    tmdbService.get.mockResolvedValue(response);

    await expect(service.findAll()).resolves.toBe(response);
    expect(tmdbService.get).toHaveBeenCalledWith('/discover/movie', undefined);
  });

  it('findAll passes page param when provided', async () => {
    const response = { results: [] };
    tmdbService.get.mockResolvedValue(response);

    await expect(service.findAll(2)).resolves.toBe(response);
    expect(tmdbService.get).toHaveBeenCalledWith('/discover/movie', { page: 2 });
  });

  it('findOne calls TMDB movie endpoint', async () => {
    const response = { id: 123 };
    tmdbService.get.mockResolvedValue(response);

    await expect(service.findOne(123)).resolves.toBe(response);
    expect(tmdbService.get).toHaveBeenCalledWith('/movie/123', {
      append_to_response: 'images',
    });
  });
});
