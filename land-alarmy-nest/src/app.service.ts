import { Injectable } from '@nestjs/common';
import * as request from 'request';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getLandInfo(): Promise<any> {
    const url =
      'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent';
    let queryParams =
      '?' +
      encodeURIComponent('serviceKey') +
      '=P%2B%2Fy%2FR84yS9jBDWOea6o%2BooWcZ1t9SRKQaKK23tR2DeF8HGCMh%2B61cTAFpV71qF7HdooH1nZsvvv8MtVGq71Fw%3D%3D'; /* Service Key*/
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
