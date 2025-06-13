import { Injectable } from '@nestjs/common';
import { UpdateUserProvider } from '../crud/update-user.provider';
import { UpdateUserDto } from 'src/api/users/dtos/update-user.dto';

@Injectable()
export class UpdateMeProvider {
  constructor(private readonly updateUserProvider: UpdateUserProvider) {}

  public updateMe(id: string, updateUserDto: UpdateUserDto) {
    console.log('update  me provider...');
    return this.updateUserProvider.update(id, updateUserDto);
  }
}
