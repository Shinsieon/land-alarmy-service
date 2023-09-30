import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserInterface } from 'src/user/dto/user.dto';
import { JsonDB, Config } from 'node-json-db';
import * as path from 'path';
@Injectable()
export class UserRepository {
  db: JsonDB;
  constructor() {
    const filePath = path.join(__dirname, '../../', 'database', 'users');
    this.db = new JsonDB(new Config(filePath, true, false, '/'));
  }
  async register(userDto: CreateUserDto): Promise<boolean> {
    await this.db.push(`/${userDto.phoneNumber}`, userDto, true);
    return true;
  }
  async getAll(): Promise<UserInterface[]> {
    return await this.db.getData('/');
  }
}
