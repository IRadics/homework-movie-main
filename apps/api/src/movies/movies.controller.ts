import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AddMovieInterestDto } from './dto/add-movie-interest.dto'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  async findPopular() {
    return await this.moviesService.findPopular()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.moviesService.findById(id)
  }

  @Post(':id/interest')
  async addInterest(@Param('id') id: string, @Body() interest: AddMovieInterestDto) {
    return await this.moviesService.addInterest(id, interest)
  }
}
