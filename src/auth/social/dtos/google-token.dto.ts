import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({
    description: 'Google token',
    example: 'your token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
