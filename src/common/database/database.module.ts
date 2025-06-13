import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/api/bookings/booking.entity';
import { Review } from 'src/api/reviews/review.entity';
import { Staff } from 'src/api/staff/staff.entity';
import { TourImages } from 'src/api/tours/entities/tour-images.entity';
import { Tour } from 'src/api/tours/entities/tour.entity';
import { User } from 'src/api/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.database_name'),
        entities: [Staff, User, Tour, TourImages, Review, Booking],
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        ssl: {
          rejectUnauthorized: configService.get('database.rejectUnauthorized'),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
