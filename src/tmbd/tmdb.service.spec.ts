import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

describe('TmdbService', () => {
  let service: TmdbService;
  const httpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    process.env.TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    process.env.TMDB_API_KEY = 'test-token';

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: HttpService, useValue: httpService }, TmdbService],
    }).compile();

    service = module.get<TmdbService>(TmdbService);
    httpService.get.mockReset();
  });

  it('builds request with base URL and bearer token', async () => {
    const response = { data: { ok: true } };
    httpService.get.mockReturnValue(of(response));

    await expect(service.get('/discover/movie')).resolves.toEqual({
      ok: true,
    });
    expect(httpService.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: undefined,
        headers: {
          Authorization: 'Bearer test-token',
          Accept: 'application/json',
        },
      },
    );
  });

  it('maps http errors to HttpException', async () => {
    httpService.get.mockReturnValue(
      throwError(() => ({
        response: { status: HttpStatus.BAD_GATEWAY, data: { message: 'bad' } },
      })),
    );

    await expect(service.get('/discover/movie')).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});
