import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateCinemaDto {
  @IsString()
  @IsNotEmpty({ message: 'A mozi neve kötelező' })
  @MinLength(2, { message: 'A mozi neve legalább 2 karakter legyen' })
  name!: string

  @IsString()
  @IsNotEmpty({ message: 'A város megadása kötelező' })
  city!: string
}
