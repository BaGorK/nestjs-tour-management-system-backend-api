import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI5MjU1Njg2LCJleHAiOjE2Mjk4NjAxMjZ9.1JzVz8Z7Mm2Vw5z3d6i8y1f2Ql6QYJ7x8Z1QwF8v7qAE',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
