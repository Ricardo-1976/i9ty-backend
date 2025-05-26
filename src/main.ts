import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  // Global prefix para todas as rotas (exemplo: /api)
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Documentação da API com Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? +process.env.PORT : 3000;
  await app.listen(port);

  logger.log(`API rodando em http://localhost:${port}/api`);
  logger.log(`Swagger disponível em http://localhost:${port}/docs`);
}

void bootstrap();
