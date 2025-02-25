import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ENV = process.env.NODE_ENV || 'development';

  const config = new DocumentBuilder()
    .setTitle('tour management system backend api')
    .setDescription('The tour management system backend api built using NestJs')
    .setVersion('1.0.0')
    .addServer(
      ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://tour-management-system.render.com',
    )
    .addBearerAuth() // Add Bearer token support
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  // global prefix
  app.setGlobalPrefix('api/v1');

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

  await app.listen(5000);
}
bootstrap();
