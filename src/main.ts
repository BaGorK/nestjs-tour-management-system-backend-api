import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // enable cor
  app.enableCors();

  await app.listen(5000);
}
bootstrap();
