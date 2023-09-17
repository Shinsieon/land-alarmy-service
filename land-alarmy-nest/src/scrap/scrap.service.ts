import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { ConfigService } from '@nestjs/config';

import { ScrapRepository } from './scrap.repository';
@Injectable()
export class ScrapService {
  constructor(
    private scrapRepository: ScrapRepository,
    private configService: ConfigService,
  ) {}
  async getLocalCodes() {
    return this.scrapRepository.getLocalCodes();
  }
  async setLocalCodes() {
    return this.scrapRepository.setLocalCode();
  }
  //국토교통부 단독/다가구 전월세 자료
  async getRTMSDataSvcSHRent(): Promise<any> {
    console.log(process.env);
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
      encodeURIComponent('11110'); /* */
    queryParams +=
      '&' +
      encodeURIComponent('DEAL_YMD') +
      '=' +
      encodeURIComponent('201512'); /* */

    return new Promise((res, rej) => {
      request(
        {
          url: url + queryParams,
          method: 'GET',
        },
        function (error, response, body) {
          if (error) rej(error);
          console.log('Status', response.statusCode);
          console.log('Headers', JSON.stringify(response.headers));
          console.log('Reponse received', body);
          res(body);
        },
      );
    });
  }
}
