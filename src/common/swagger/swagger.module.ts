import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static setup(app: INestApplication) {
    const ENV = process.env.NODE_ENV || 'development';

    const config = new DocumentBuilder()
      .setTitle('Tour Management System API')
      .setDescription(
        'The tour management system backend API built using NestJS',
      )
      .setVersion('1.0.0')
      .addServer(
        ENV === 'development'
          ? 'http://localhost:5000'
          : 'https://tour-management-system.render.com',
      )
      .addBearerAuth() // Add Bearer token support
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
