import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Farm Registration')
    .setDescription(
      'API for registering and managing farms and rural producers.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? +process.env.PORT : 3000;
  await app.listen(port);

  const baseUrl = process.env.HOST || 'http://localhost';
  logger.log(`Application is running on: ${baseUrl}:${port}/api`);
  logger.log(`Swagger documentation is available at: ${baseUrl}:${port}/docs`);
}

void bootstrap();
