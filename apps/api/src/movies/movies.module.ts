import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { CinemasService } from 'src/cinemas/cinemas.service'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, CinemasService],
  exports: [MoviesService],
})
export class MoviesModule {}
