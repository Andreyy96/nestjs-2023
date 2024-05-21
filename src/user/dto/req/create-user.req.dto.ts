export class CreateUserReqDto {
  public readonly name: string;

  public readonly email: string;

  public readonly phone?: string;

  public readonly password: string;

  public readonly age?: number;

  public readonly avatar?: string;
}
