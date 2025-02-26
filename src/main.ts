import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './common/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const API_PREFIX = process.env.API_PREFIX || 'api/v1';

  // global prefix
  app.setGlobalPrefix(API_PREFIX);

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // properties that does not exist in the dto will be stripped
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)), // Apply ClassSerializerInterceptor globally
  );

  // enable cors
  app.enableCors();

  // Setup Swagger
  SwaggerConfigModule.setup(app);

  await app.listen(5000);
}
bootstrap();
