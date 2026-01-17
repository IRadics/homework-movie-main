import { Controller, Get, Param } from '@nestjs/common'
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
}
