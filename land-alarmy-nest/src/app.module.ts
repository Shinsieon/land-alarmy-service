import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapModule } from './scrap/scrap.module';
import { ConfigModule } from '@nestjs/config';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserService } from './user/user.service';
import { SmsService } from './sms/sms.service';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScrapModule,
    SmsModule,
    UserModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, SmsService],
})
export class AppModule {}
