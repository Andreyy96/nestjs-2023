import { UuidFactory } from '@nestjs/core/inspector/uuid-factory';
import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({
    example: UuidFactory,
    description: 'The id of the User',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'The name of the User',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'test@.gmail.com',
    description: 'The email of the User',
  })
  public readonly email: string;

  @ApiProperty({
    example: 20,
    description: 'The age of the User',
  })
  public readonly age?: number;

  @ApiProperty({
    example: 'https://www.example.com/avatar.jpg',
    description: 'The avatar of the User',
  })
  public readonly avatar?: string;
}
