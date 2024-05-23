import { Injectable } from '@nestjs/common';

import { CreateAuthReqDto } from './dto/req/create-auth.req.dto';
import { UpdateAuthReqDto } from './dto/req/update-auth.req.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthReqDto) {
    return `This action adds a new auth ${createAuthDto}`;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthReqDto) {
    return `This action updates a #${id} auth ${updateAuthDto}`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }
}
