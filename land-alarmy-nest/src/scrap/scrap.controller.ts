import { Controller, Get } from '@nestjs/common';
import { ScrapService } from './scrap.service';

@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}
  @Get('localCodes')
  getLocalCodes() {
    return this.scrapService.getLocalCodes();
  }

  @Get('getRTMSDataSvcSHRent')
  getRTMSDataSvcSHRent() {
    return this.scrapService.getRTMSDataSvcSHRent();
  }

  @Get('setLocalCodes')
  setLocalCodes() {
    return this.scrapService.setLocalCodes();
  }
}
