import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class FindOneTourByProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}

  public async findOneTourBy(options: Partial<Tour>) {
    console.log('find one tour by ...');

    try {
      return await this.toursRepository.findOneBy(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'faild to fetch a tour, please try again later',
      );
    }
  }
}
