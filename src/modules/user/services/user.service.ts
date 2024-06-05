import { ConflictException, Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<any> {
    return await this.userRepository.find();
  }

  public async findOne(id: string): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async update(
    userData: IUserData,
    updateUserDto: UpdateUserReqDto,
  ): Promise<any> {
    return `This action updates a #${userData.userId} user ${updateUserDto}`;
  }

  public async remove(id: string): Promise<any> {
    return `This action removes a #${id} user`;
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }
}
