import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SignInDto {
  @IsInt()
  id: number;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userName: string;

  constructor(id: number, userName: string) {
    this.id = id;
    this.userName = userName;
  }
}
