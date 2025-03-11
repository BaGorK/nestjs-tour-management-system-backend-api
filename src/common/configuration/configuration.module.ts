import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import emailConfig from './config/email.config';
import environmentValidation from './config/environment.validation';
import twilioConfig from './config/twilio.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, emailConfig, twilioConfig],
      validationSchema: environmentValidation,
    }),
  ],
})
export class ConfigurationModule {}
