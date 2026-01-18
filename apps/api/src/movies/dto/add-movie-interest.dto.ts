import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class AddMovieInterestDto {
  @IsString()
  @IsNotEmpty({ message: 'Email megadása kötelező' })
  @IsEmail({}, { message: 'Nem megfelelő email formátum' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1, { message: 'A jegyek száma minimum 1, maximum 10 lehet' })
  @Max(10, { message: 'A jegyek száma minimum 1, maximum 10 lehet' })
  ticketCount!: number

  @IsString()
  @IsNotEmpty({ message: 'A mozi megadása kötelező' })
  cinemaId!: string
}
