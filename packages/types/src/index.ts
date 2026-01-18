export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface Cinema {
  id: string
  name: string
  city: string
}

export interface Movie {
  id: number
  title: string
  releaseDate: string
  posterUrl: string
}

export interface MovieDetails extends Movie {
  overview: string
}

export interface AddMovieInterestDto {
  email: string
  ticketCount: number
  cinemaId: string
  movieId: number
}
