import type { Cinema } from './cinemas.constants'
import type { CreateCinemaDto } from './dto/create-cinema.dto'
import { Injectable } from '@nestjs/common'
import { CINEMAS } from './cinemas.constants'

@Injectable()
export class CinemasService {
  findAll(): Cinema[] {
    return CINEMAS
  }

  findById(id: string): Cinema | undefined {
    return CINEMAS.find((cinema) => cinema.id === id)
  }

  create(_createCinemaDto: CreateCinemaDto): Cinema {
    // Nem kell implementalni csak minta DTO-t használunk erre
    throw new Error('Not implemented')
  }
}
