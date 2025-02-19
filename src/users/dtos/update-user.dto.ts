import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;
}
