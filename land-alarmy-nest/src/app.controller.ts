import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './user/user.service';
import { RTMSDataSvcSHRent_Inf } from './interface/RTMSDataSvcSHRent.interface';
import { UserInterface } from './user/dto/user.dto';
import { ScrapService } from './scrap/scrap.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly scrapService: ScrapService,
  ) {}

  @Get()
  getHello(): string {
    //return this.appService.getLandInfo();
    //this.scrapService.setLocalCode();
    return 'hello';
    //return this.appService.getHello();
  }
  @Cron(CronExpression.EVERY_10_HOURS)
  async run() {
    //TODO: 비지니스 로직을 작성해주세요.
    //this.logger.log('10초마다 정기적으로 실행되는 코드 입니다.');
    const users = await this.userService.getAll();
    const userPhonenumbers = Object.keys(users);

    let LocalInfos: { [key: string]: RTMSDataSvcSHRent_Inf } = {};
    for (const phoneNumber of userPhonenumbers) {
      const user = users[phoneNumber] as UserInterface;
      const [YYYY, MM, DD] = new Date().toISOString().slice(0, 10).split('-');
      if (!LocalInfos[user.code]) {
        let localDataFromApi: any = (
          await this.scrapService.getRTMSDataSvcSHRent(
            user.code.slice(0, 5),
            YYYY + MM,
          )
        ).response.body[0];
        if (localDataFromApi.totalCount == 0) return;
        localDataFromApi = localDataFromApi.items[0].item;
        console.log(localDataFromApi);
        console.

        let localInfo: RTMSDataSvcSHRent_Inf = {
          code: localDataFromApi.code,
          useOfRenewalRequestRights: localDataFromApi['갱신요구권사용'],
          contractClassification: localDataFromApi['계약구분'],
          yearOfConstruction: localDataFromApi['건축년도'],
          term: localDataFromApi['계약기간'],
          size: localDataFromApi['계약면적'],
          year: localDataFromApi['년'],
          beopjeongDong: localDataFromApi['법정동'],
          depositAmount: localDataFromApi['보증금액'],
          month: localDataFromApi['월'],
          monthlyRentAmount: localDataFromApi['월세금액'],
          day: localDataFromApi['일'],
          previousContractDeposit: localDataFromApi['종전계약보증금'],
          previousContractMonthlyRent: localDataFromApi['종전계약월세'],
        };
        LocalInfos[user.code] = localInfo;
      }
    }

    console.log(LocalInfos);
  }
  onApplicationBootstrap() {
    this.run();
  }
}
