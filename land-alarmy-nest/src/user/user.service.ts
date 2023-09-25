import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async register(userDto: CreateUserDto): Promise<boolean> {
    return await this.userRepository.register(userDto);
  }
  async getAll(): Promise<CreateUserDto> {
    return await this.userRepository.getAll();
  }
}
