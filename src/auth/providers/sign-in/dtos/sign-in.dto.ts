import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'user@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'test1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  password: string;
}
