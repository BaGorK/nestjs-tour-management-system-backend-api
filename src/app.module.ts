import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from './auth/guards/authorization/authorization.guard';
import { BookingsModule } from './bookings/bookings.module';
import { DataResponseInterceptor } from './lib/common/interceptors/data-response/data-response.interceptor';
import { TimeoutInterceptor } from './lib/common/interceptors/timeout/timeout.interceptor';
import appConfig from './lib/config/app.config';
import databaseConfig from './lib/config/database.config';
import environmentValidation from './lib/config/environment.validation';
import { ReviewsModule } from './reviews/reviews.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';

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

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
