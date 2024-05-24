import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

class CarReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @MaxLength(255)
  producer: string;

  @IsString()
  @Transform(TransformHelper.trim)
  model: string;
}

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

  @IsString()
  @Matches(
    /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,
  )
  @Transform(TransformHelper.trim)
  public readonly phone?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object) => object.age > 25)
  @MaxLength(255)
  @Transform(TransformHelper.trim)
  public readonly avatar?: string;

  @IsInt()
  @IsNumber()
  @Min(18)
  @Max(150)
  @IsOptional()
  @Type(() => Number)
  public readonly age?: number;

  @IsOptional()
  @IsObject()
  @Type(() => CarReqDto)
  @ValidateNested({ each: true })
  car: CarReqDto;
}
