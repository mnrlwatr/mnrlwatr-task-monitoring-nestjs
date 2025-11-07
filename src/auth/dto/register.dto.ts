import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { UserRole } from './user.enum';

export class RegisterDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsInt()
  @Min(0)
  @Max(1)
  userRole: UserRole;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    userRole: UserRole,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
  }
}
