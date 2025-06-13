import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleUser } from 'src/api/users/interfaces/google-user.interface';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: IGoogleUser) {
    try {
      const user = this.usersRepository.create(googleUser);
      return await this.usersRepository.save(user);
    } catch (err) {
      console.log(err);
      throw new ConflictException('Could not create google user');
    }
  }
}
