import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ChapaModule } from 'chapa-nestjs';
import { AuthModule } from './api/auth/auth.module';
import jwtConfig from './api/auth/config/jwt.config';
import { AccessTokenGuard } from './api/auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './api/auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from './api/auth/guards/authorization/authorization.guard';
import { BookingsModule } from './api/bookings/bookings.module';
import { PaymentsModule } from './api/payments/payments.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { StaffModule } from './api/staff/staff.module';
import { ToursModule } from './api/tours/tours.module';
import { UsersModule } from './api/users/users.module';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { DatabaseModule } from './common/database/database.module';
import { EmailModule } from './common/email/email.module';
import { FileUploadModule } from './common/file-upload/file-upload.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { PinnoLoggerModule } from './common/pinno-logger/pinno-logger.module';
import { SwaggerConfigModule } from './common/swagger/swagger.module';
import { TwilioModule } from './common/twilio/twilio.module';

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
    PinnoLoggerModule,
    EmailModule,

    ChapaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretKey: configService.get('appConfig.chapaSecretKey'),
      }),
    }),

    TwilioModule,
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
