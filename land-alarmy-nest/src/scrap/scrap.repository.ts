import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ScrapRepository {
  constructor() {}
  async getLocalCodes() {
    try {
      const filePath = path.join(
        __dirname,
        '../../',
        'assets',
        'code_ko_detail.txt',
      );
      const data = fs.readFileSync(filePath, 'utf-8');
      console.log('저장된 데이터 개수 : ', data.length);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  //공공데이터포털에서 저장한 법정동코드를 시/군/구 에 따라 그룹핑해서 저장합니다.
  async setLocalCode(): Promise<void> {
    const filePath = path.join(__dirname, '../../', 'assets', 'code_ko.txt');
    let data = fs.readFileSync(filePath, 'utf-8');
    let ndata = data.split('\n');
    let result = {};
    for (let i = 0; i < ndata.length; i++) {
      if (i === 0) continue;
      let [code, name, isExist] = ndata[i].split('\t');
      if (isExist) isExist = isExist.replace('\r', '');
      if (code.slice(5) === '00000' && isExist === '존재') {
        result[code] = code + ' ' + name + ' ' + isExist;
      }
    }
    let nResult = Object.values(result).join('\n');
    const nfilePath = path.join(
      __dirname,
      '../../',
      'assets',
      'code_ko_detail.txt',
    );
    fs.writeFile(nfilePath, nResult, (err) => {
      if (err) {
        console.error('파일 저장 중 오류 발생:', err);
        return;
      }
      console.log('파일이 성공적으로 저장되었습니다.');
    });
  }
}
