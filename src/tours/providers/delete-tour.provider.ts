import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class DeleteTourProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}

  public async deleteTour(id: string) {
    console.log('delete tour ...');
    let tour = undefined;

    try {
      tour = await this.toursRepository.findOneBy({ id });
    } catch (err) {
      console.log(err);
      throw new ConflictException('Unable to find a tour');
    }

    if (!tour) {
      throw new NotFoundException(`Tour with tour ID: ${id} not found.`);
    }

    try {
      await this.toursRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new ConflictException(
        `Unable to delete a tour with tour ID: ${id}`,
      );
    }

    return {
      status: 'success',
      message: `Tour with tour ID: ${id} deleted successfully`,
    };
  }
}
