import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDTO(user);
  }

  public async getById(id: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toResponseDTO(user);
  }

  public async updateMe(
    userData: IUserData,
    updateUserDto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });

    const updateUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return UserMapper.toResponseDTO(updateUser);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
  }

  public async follow(userData: IUserData, userId: string): Promise<void> {
    if (userId === userData.userId) {
      throw new ConflictException('You cannot follow yourself');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (follow) {
      throw new ConflictException('You already following this user');
    }

    await this.followRepository.save(
      this.followRepository.create({
        follower_id: userData.userId,
        following_id: userId,
      }),
    );
  }
  public async unfollow(userData: IUserData, userId: string): Promise<void> {
    if (userId === userData.userId) {
      throw new ConflictException('You cannot unfollow yourself');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (!follow) {
      throw new ConflictException('You cannot unfollow this user');
    }

    await this.followRepository.remove(follow);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }
}
