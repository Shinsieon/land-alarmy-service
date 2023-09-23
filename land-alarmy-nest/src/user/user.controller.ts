import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const isSuccess = await this.userService.register(userDto);
    if (isSuccess) res.status(HttpStatus.CREATED).send();
  }
}
