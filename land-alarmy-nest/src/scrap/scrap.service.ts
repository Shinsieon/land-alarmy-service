import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { ConfigService } from '@nestjs/config';
import { parseStringPromise } from 'xml2js';
import { ScrapRepository } from './scrap.repository';
import { getOneMonthBefore } from 'src/lib/utils';
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
  //국토교통부 단독/다가구 전월세 자료
  async getRTMSDataSvcSHRent(
    CODE: string,
    YYYYMM: string,
    TRY_COUNT = 0,
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
        function (error, response, body) {
          if (error) rej(error);
          else {
            parseStringPromise(body).then((result) => {
              if (
                result.body?.totalCount === '0' &&
                TRY_COUNT < this.MAX_TRY_COUNT
              ) {
                this.getRTMSDataSvcSHRent(
                  CODE,
                  getOneMonthBefore(YYYYMM),
                  TRY_COUNT++,
                );
              } else res(result);
            });
          }
        },
      );
    });
  }
}
