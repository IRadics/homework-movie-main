import type { Movie } from '@repo/types'
import { env } from 'node:process'
import { HttpService } from '@nestjs/axios'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom, map, of } from 'rxjs'
import { TMDB_Error, TMDB_Error_Code, TMDB_Movie, TMDB_PagedRespose } from 'src/types/tmdb'

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService) {}

  async findPopular(): Promise<Movie[]> {
    return await firstValueFrom(this.httpService.get<TMDB_PagedRespose<TMDB_Movie>>(`${env.TMDB_API_URL}/discover/movie`, {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
      },
    })
      .pipe(
        map(response => response.data.results.map(movie => (
          {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            posterUrl: movie.poster_path,
          }))),
      ))
  }

  async findById(id: string): Promise<Movie | undefined> {
    return await firstValueFrom(this.httpService.get<TMDB_Movie>(`${env.TMDB_API_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
      },
    })
      .pipe(
        map(response => (
          {
            id: response.data.id,
            title: response.data.title,
            overview: response.data.overview,
            releaseDate: response.data.release_date,
            posterUrl: response.data.poster_path,
          }
        )),
        catchError((error: AxiosError<TMDB_Error>) => {
          if (error.response?.data.status_code === TMDB_Error_Code.ResourceNotFound) {
            return of(undefined)
          }
          throw InternalServerErrorException
        }),
      ))
  }
}
