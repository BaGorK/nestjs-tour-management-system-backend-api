import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/tours/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetTourByIdProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}

  public async getTour(id: string) {
    console.log('get a tour by id ...');

    let tour = undefined;

    try {
      tour = await this.toursRepository.findOne({
        where: { id },
        relations: {
          guids: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'failed to fetch a tour by id. please try again later',
      );
    }

    if (!tour) {
      throw new NotFoundException(`Tour with tour ID: ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find a tour by id',
      data: tour,
    };
  }
}
