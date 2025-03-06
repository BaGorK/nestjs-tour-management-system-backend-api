import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from './auth/guards/authorization/authorization.guard';
import { BookingsModule } from './bookings/bookings.module';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { DatabaseModule } from './common/database/database.module';
import { FileUploadModule } from './common/file-upload/file-upload.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { SwaggerConfigModule } from './common/swagger/swagger.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';
import { ChapaModule } from 'chapa-nestjs';
import { StaffModule } from './staff/staff.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    BookingsModule,
    ToursModule,
    UsersModule,
    ReviewsModule,
    AuthModule,
    PaymentsModule,
    StaffModule,

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    DatabaseModule,
    SwaggerConfigModule,
    ConfigurationModule,
    InterceptorsModule,
    FileUploadModule,

    ChapaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretKey: configService.get('appConfig.chapaSecretKey'),
      }),
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get('appConfig.environment') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
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
