import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class UpdateUserReqDto {
  @IsString()
  @Length(3, 30)
  @Transform(TransformHelper.trim)
  public readonly name?: string;

  @IsInt()
  @IsNumber()
  @Min(18)
  @Max(150)
  @IsOptional()
  @Type(() => Number)
  public readonly age?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object) => object.age > 25)
  @MaxLength(255)
  @Transform(TransformHelper.trim)
  public readonly avatar?: string;
}
