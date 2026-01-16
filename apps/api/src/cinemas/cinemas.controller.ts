import type { CreateCinemaDto } from './dto/create-cinema.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { CinemasService } from './cinemas.service'

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Get()
  findAll() {
    return this.cinemasService.findAll()
  }

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemasService.create(createCinemaDto)
  }
}
