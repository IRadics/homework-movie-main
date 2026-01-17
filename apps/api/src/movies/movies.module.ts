import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
