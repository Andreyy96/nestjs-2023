import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateUserReqDto {
  @IsString()
  @Length(3, 30)
  @Transform(TransformHelper.trim)
  public readonly name: string;

  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  public readonly email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Invalid password',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  public readonly password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(TransformHelper.trim)
  public readonly image?: string;

  @IsOptional()
  @Transform(TransformHelper.trim)
  public readonly bio?: string;
}
