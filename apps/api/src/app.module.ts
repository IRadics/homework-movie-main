import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { CinemasModule } from './cinemas/cinemas.module'
import { MoviesModule } from './movies/movies.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CinemasModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
