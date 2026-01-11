import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindOneParams } from './dto/find-one-params.dto';
import { SearchMoviesQuery } from './dto/search-movies-query.dto';
import { FindAllQuery } from './dto/find-all-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.moviesService.findAll(query.page);
  }

  @Get('search')
  search(@Query() query: SearchMoviesQuery) {
    return this.moviesService.search(query.query, query.page);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.moviesService.findOne(Number(params.id));
  }
}
