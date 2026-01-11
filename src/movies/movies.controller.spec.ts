import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  const moviesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: moviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService.findAll.mockReset();
    moviesService.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll returns movies from service', async () => {
    const response = { results: [] };
    moviesService.findAll.mockResolvedValue(response);

    await expect(controller.findAll()).resolves.toBe(response);
    expect(moviesService.findAll).toHaveBeenCalledTimes(1);
  });

  it('findAll passes page query to service', async () => {
    const response = { results: [] };
    moviesService.findAll.mockResolvedValue(response);

    await expect(controller.findAll('3')).resolves.toBe(response);
    expect(moviesService.findAll).toHaveBeenCalledWith(3);
  });

  it('findOne passes numeric id to service', async () => {
    const response = { id: 7 };
    moviesService.findOne.mockResolvedValue(response);

    await expect(controller.findOne({ id: '7' })).resolves.toBe(response);
    expect(moviesService.findOne).toHaveBeenCalledWith(7);
  });
});
