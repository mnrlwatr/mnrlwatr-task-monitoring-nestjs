import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { RegisterDto } from './dto/register.dto';
import { RahbarService } from 'src/rahbar/rahbar.service';
import { UserRole } from './dto/user.enum';
import { CreateRahbarDto } from 'src/rahbar/dto/create-rahbar.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import type { Response } from 'express';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly rahbarService: RahbarService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async signIn(res: Response, dto: SignInDto) {
    const { email, password } = dto;
    const rahbar = await this.rahbarService.findByEmail(email);
    if (!rahbar) {
      throw new NotFoundException(`User with email:${email} not found`);
    }
    const isValidPassword = await verify(rahbar.password, password);
    if (isValidPassword) {
      return this.auth(res, email);
    } else {
      throw new NotFoundException('Invalid password');
    }
  }

  private auth(res: Response, email: string) {
    const { accessToken, refreshToken } = this.generateTokens(email);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    );
    return accessToken;
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

  async register(res: Response, dto: RegisterDto) {
    if (dto.userRole === UserRole.Rahbar) {
      const rahbar: CreateRahbarDto = {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: await hash(dto.password),
      };
      return await this.registerRahbar(res, rahbar);
    } else if (dto.userRole === UserRole.Hodim) {
      // todo:
    }
  }

  private async registerRahbar(res: Response, dto: CreateRahbarDto) {
    const { email } = dto;
    const rahbar = await this.rahbarService.findByEmail(email);

    if (rahbar) {
      throw new ConflictException(`Rahbar with email:${email} is registered`);
    } else {
      await this.rahbarService.create(dto);
      return this.auth(res, email);
    }
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });

    console.log('READED COOKIE' + this.COOKIE_DOMAIN);
  }
}
