import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindOneParams } from './dto/find-one-params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query('page') page?: string) {
    return this.moviesService.findAll(page ? Number(page) : undefined);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.moviesService.findOne(Number(params.id));
  }
}
