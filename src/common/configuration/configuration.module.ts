import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/lib/config/app.config';
import databaseConfig from 'src/lib/config/database.config';
import environmentValidation from 'src/lib/config/environment.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
  ],
})
export class ConfigurationModule {}
