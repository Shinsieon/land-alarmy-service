import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService) {}
  async sendSms(to: string, content: string) {
    const serviceId = this.configService.get('SENS_SERVICE_ID');
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const date = Date.now().toString();

    axios
      .post(
        url,
        {
          type: 'SMS',
          contentType: 'COMM',
          countryCode: '82',
          from: '01087265402',
          content: content,
          messages: [
            {
              to: to,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': date,
            'x-ncp-iam-access-key': '7xA30SkAVKnoWzpU0HLr',
            'x-ncp-apigw-signature-v2': this.makeSignature(),
          },
        },
      )
      .then((res) => {
        if (res.data.statusCode == '202')
          console.log(
            `${to} 에게 ${content.length} 건을 정상적으로 전송했습니다.`,
          );
      });
  }
  makeSignature() {
    const url2 =
      '/sms/v2/services/ncp:sms:kr:288109456790:land-alarmy/messages';
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'POST'; // method
    const timestamp = Date.now().toString(); // current timestamp (epoch)
    const accessKey = '7xA30SkAVKnoWzpU0HLr'; // access key id (from portal or Sub Account)
    const secretKey = 'ddG0h1hkOp4wAUe0uGNRD3EquaYRLbsFqzbnrUBr'; // secret key (from portal or Sub Account)

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    return hash.toString(CryptoJS.enc.Base64);
  }
}
