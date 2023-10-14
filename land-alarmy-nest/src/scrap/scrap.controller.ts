import { Controller, Get, Request } from '@nestjs/common';
import { ScrapService } from './scrap.service';

@Controller('scrap')
export class ScrapController {
  constructor(private readonly scrapService: ScrapService) {}
  @Get('localCodes')
  getLocalCodes() {
    return this.scrapService.getLocalCodes();
  }

  @Get('getRTMSDataSvcSHRent')
  getRTMSDataSvcSHRent(@Request() req) {
    console.log(req.body);
    // const user : UserInterface
    // return this.scrapService.getUserRTMSDataSvcApartRent('11110', '202309', 0);
  }

  @Get('setLocalCodes')
  setLocalCodes() {
    return this.scrapService.setLocalCodes();
  }
}
