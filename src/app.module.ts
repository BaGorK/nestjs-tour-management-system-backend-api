import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import appConfig from './lib/config/app.config';
import databaseConfig from './lib/config/database.config';
import { ReviewsModule } from './reviews/reviews.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';
import environmentValidation from './lib/config/environment.validation';

@Module({
  imports: [
    BookingsModule,
    ToursModule,
    UsersModule,
    ReviewsModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),

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
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        ssl: {
          rejectUnauthorized: configService.get('database.rejectUnauthorized'),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
