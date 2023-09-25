import { Module } from '@nestjs/common';
import { ScrapController } from './scrap.controller';
import { ScrapService } from './scrap.service';
import { ScrapRepository } from './scrap.repository';

@Module({
  controllers: [ScrapController],
  providers: [ScrapService, ScrapRepository],
  exports: [ScrapService, ScrapRepository],
})
export class ScrapModule {}
