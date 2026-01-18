import type { Movie } from '@repo/types'
import { env } from 'node:process'
import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom, map, of } from 'rxjs'
import { CinemasService } from 'src/cinemas/cinemas.service'
import { TMDB_Error, TMDB_Error_Code, TMDB_Movie, TMDB_PagedRespose } from 'src/types/tmdb'
import { AddMovieInterestDto } from './dto/add-movie-interest.dto'

// TODO: replace with TMDB API configuration
const imagePath = 'https://image.tmdb.org/t/p/w500/'

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService, private cinemasService: CinemasService) {}

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
            posterUrl: `${imagePath}${movie.poster_path}`,
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
        map(response => response.data),
        map(movie => (
          {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            releaseDate: movie.release_date,
            posterUrl: `${imagePath}${movie.poster_path}`,
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

  async addInterest(_id: string, _interest: AddMovieInterestDto) {
    const movie = await this.findById(_id)
    if (!movie) {
      throw new HttpException({ error: 'Film nem található' }, 400)
    }

    const cinema = this.cinemasService.findById(_interest.cinemaId)
    if (!cinema) {
      throw new HttpException({ error: 'Mozi nem található' }, 400)
    }

    console.log(`AddInterest movie id: ${_id} \n`, `Payload: \n`, JSON.stringify(_interest, null, 2))
    return { ok: true }
  }
}
