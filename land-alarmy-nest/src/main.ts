import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as xmlParser from 'express-xml-bodyparser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(xmlParser());
  await app.listen(4000);
  await app.init();
}
bootstrap();
