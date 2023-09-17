import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapModule } from './scrap/scrap.module';
import { ConfigModule } from '@nestjs/config';
import { SmsController } from './sms/sms.controller';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScrapModule,
    SmsModule,
  ],
  controllers: [AppController, SmsController],
  providers: [AppService, SmsService],
})
export class AppModule {}
