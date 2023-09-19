import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/user.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //return this.appService.getLandInfo();
    //this.scrapService.setLocalCode();
    return 'hello';
    //return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<string> {
    return await this.appService.register;
  }
}
