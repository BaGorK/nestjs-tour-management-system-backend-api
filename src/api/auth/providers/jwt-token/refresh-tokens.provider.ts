import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/api/auth/config/jwt.config';
import { RefreshTokenDto } from 'src/api/auth/dtos/refresh-token.dto';
import { ActiveUserData } from 'src/api/auth/interfaces/active-user-data.interface';
import { UsersService } from 'src/api/users/providers/users.service';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly generateTokenProvider: GenerateTokenProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<ActiveUserData>(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      const user = await this.usersService.findOneUserBy({ id: sub });

      if (!user) {
        throw new BadRequestException('Invalid credentials provided');
      }

      return await this.generateTokenProvider.generateToken(user);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        (err as Error).message || 'Unable to refresh token at the moment',
      );
    }
  }
}
