import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { RegisterDto } from './dto/register.dto';
import { RahbarService } from 'src/rahbar/rahbar.service';
import { UserRole } from './dto/user.enum';
import { CreateRahbarDto } from 'src/rahbar/dto/create-rahbar.dto';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { JwtPaylod } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly rahbarService: RahbarService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const rahbar = await this.rahbarService.findByEmail(dto.email);
  }

  private generateTokens(email: string) {
    const accessToken = this.jwtService.sign(
      { email },
      {
        expiresIn: '2h',
      },
    );

    const refreshToken = this.jwtService.sign(
      { email },
      {
        expiresIn: '5d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    if (dto.userRole === UserRole.Rahbar) {
      const rahbar: CreateRahbarDto = {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: await hash(dto.password),
      };
      return await this.registerRahbar(rahbar);
    } else if (dto.userRole === UserRole.Hodim) {
    }
  }

  private async registerRahbar(dto: CreateRahbarDto) {
    const { email } = dto;
    const rahbar = await this.rahbarService.findByEmail(email);

    if (rahbar) {
      throw new ConflictException(`Rahbar with email:${email} is registered`);
    } else {
      await this.rahbarService.create(dto);
      return this.generateTokens(email);
    }
  }
}
