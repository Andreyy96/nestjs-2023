import { PartialType } from '@nestjs/swagger';

import { CreateAuthReqDto } from './create-auth.req.dto';

export class UpdateAuthReqDto extends PartialType(CreateAuthReqDto) {}
