import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './user/user.service';
import { ScrapService } from './scrap/scrap.service';
import {
  RTMSDataSvcAptRent_Inf,
  RTMSDataSvcSHRent_Inf,
} from './interface/RTMSDataSvc.interface';
import { SmsService } from './sms/sms.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly scrapService: ScrapService,
    private readonly smsService: SmsService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async run() {
    //TODO: 비지니스 로직을 작성해주세요.
    //this.logger.log('10초마다 정기적으로 실행되는 코드 입니다.');
    const users = await this.userService.getAll();
    let LocalInfos: { [key: string]: RTMSDataSvcAptRent_Inf[] } = {};

    for (const phoneNumber of Object.keys(users)) {
      const user = users[phoneNumber];
      let localInfo =
        LocalInfos[user.code] ||
        (await this.scrapService.getUserRTMSDataSvcApartRent<RTMSDataSvcAptRent_Inf>(
          user,
        ));
      LocalInfos[user.code] = localInfo;

      const filteredHomes =
        this.scrapService.getFilteredRTMSData<RTMSDataSvcAptRent_Inf>(
          user,
          localInfo,
        );
      console.log(filteredHomes);
      if (filteredHomes.length > 0) {
        this.smsService.sendSms(
          phoneNumber,
          filteredHomes
            .map((home) => home.apart[0].toString())
            .join('/')
            .toString(),
        );
      }
    }
  }
  onApplicationBootstrap() {
    this.run();
  }
}
