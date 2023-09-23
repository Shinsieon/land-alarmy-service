import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRepository } from './user/user.repository';
@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);
  private readonly userRepository = new UserRepository();
  getHello(): string {
    return 'Hello World!';
  }
  @Cron(CronExpression.EVERY_10_HOURS)
  async run() {
    //TODO: 비지니스 로직을 작성해주세요.
    //this.logger.log('10초마다 정기적으로 실행되는 코드 입니다.');
    const users = await this.userRepository.getAll();
    const userPhonenumbers = Object.keys(users);
    const shouldFindLocalCodes = userPhonenumbers.map((item) => {
      return users[item].code;
    });

    console.log(shouldFindLocalCodes);
  }
  onApplicationBootstrap() {
    this.run();
  }
}
