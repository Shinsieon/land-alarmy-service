import { Module } from '@nestjs/common';
import { ScrapController } from './scrap.controller';
import { ScrapService } from './scrap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapRepository } from './scrap.repository';

@Module({
  controllers: [ScrapController],
  providers: [ScrapService, ScrapRepository],
})
export class ScrapModule {}
