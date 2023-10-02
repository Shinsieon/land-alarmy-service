import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { ConfigService } from '@nestjs/config';
import { parseStringPromise } from 'xml2js';
import { ScrapRepository } from './scrap.repository';
import { getOneMonthBefore } from 'src/lib/utils';
import { UserInterface } from 'src/user/dto/user.dto';
import { RTMSDataSvcSHRent_Inf } from 'src/interface/RTMSDataSvcSHRent.interface';
@Injectable()
export class ScrapService {
  MAX_TRY_COUNT: number;
  constructor(
    private scrapRepository: ScrapRepository,
    private configService: ConfigService,
  ) {
    this.MAX_TRY_COUNT = 5;
  }
  async getLocalCodes() {
    return this.scrapRepository.getLocalCodes();
  }
  async setLocalCodes() {
    return this.scrapRepository.setLocalCode();
  }
  async getUserRTMSDataSvcSHRent(
    user: UserInterface,
  ): Promise<RTMSDataSvcSHRent_Inf[]> {
    const [YYYY, MM, DD] = new Date().toISOString().slice(0, 10).split('-');
    let localDataFromApi: any = (
      await this.getRTMSDataSvcSHRent(user.code.slice(0, 5), YYYY + MM, 0)
    ).response.body[0];
    if (localDataFromApi.totalCount == 0) return [];
    localDataFromApi = localDataFromApi.items[0].item;
    localDataFromApi = localDataFromApi.map((item) => {
      return {
        code: user.code,
        useOfRenewalRequestRights: item['갱신요구권사용'],
        contractClassification: item['계약구분'],
        yearOfConstruction: item['건축년도'],
        term: item['계약기간'],
        size: item['계약면적'],
        year: item['년'],
        beopjeongDong: item['법정동'],
        depositAmount: item['보증금액'],
        month: item['월'],
        monthlyRentAmount: item['월세금액'],
        day: item['일'],
        previousContractDeposit: item['종전계약보증금'],
        previousContractMonthlyRent: item['종전계약월세'],
      };
    });
    return localDataFromApi;
  }
  getFilteredRTMSDataSvcSHRent(
    user: UserInterface,
    homes: RTMSDataSvcSHRent_Inf[],
  ) {
    // homes = homes.filter(
    //   (home) =>
    //     Number(home.size[0]) < user.size * 10 + 10 &&
    //     Number(home.depositAmount[0]) >= user.price[0] * 1000 &&
    //     Number(home.depositAmount[0]) <= user.price[1] * 1000 &&
    //     (user.tradeType.all === true || user.tradeType.rentForMonth === true) &&
    //     home.monthlyRentAmount[0],
    // );
    console.log(homes[0]);
    homes = homes.filter((home) => Number(home.size[0]) < user.size * 10 + 30);
    console.log(user, homes);
  }
  //국토교통부 단독/다가구 전월세 자료
  async getRTMSDataSvcSHRent(
    CODE: string,
    YYYYMM: string,
    TRY_COUNT: number,
  ): Promise<any> {
    const url =
      'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent';
    let queryParams =
      '?' +
      encodeURIComponent('serviceKey') +
      '=' +
      `${this.configService.get('ENCODED_API_KEY')}`; /* Service Key*/
    queryParams +=
      '&' +
      encodeURIComponent('LAWD_CD') +
      '=' +
      encodeURIComponent(CODE); /* */
    queryParams +=
      '&' +
      encodeURIComponent('DEAL_YMD') +
      '=' +
      encodeURIComponent(YYYYMM); /* */

    return new Promise((res, rej) => {
      request(
        {
          url: url + queryParams,
          method: 'GET',
        },
        (error, response, body) => {
          if (error) rej(error);
          else {
            parseStringPromise(body).then((result) => {
              if (
                result.response.body[0].totalCount[0] === '0' &&
                TRY_COUNT < this.MAX_TRY_COUNT
              ) {
                res(
                  this.getRTMSDataSvcSHRent(
                    CODE,
                    getOneMonthBefore(YYYYMM),
                    TRY_COUNT + 1,
                  ),
                );
              } else res(result);
            });
          }
        },
      );
    });
  }
}
