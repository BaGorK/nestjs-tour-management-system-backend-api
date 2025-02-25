import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const { googleClientId, googleClientSecret } = this.jwtConfiguration;
    this.oauthClient = new OAuth2Client(googleClientId, googleClientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log(loginTicket);
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
        picture: profilePicture,
      } = loginTicket.getPayload();
      const user = await this.usersService.findOneUserBy({ email });

      if (user) {
        return this.generateTokenProvider.generateToken(user);
      }

      const newUser = await this.usersService.createGoogleUser({
        email,
        googleId,
        firstName,
        lastName,
        profilePicture,
      });

      return this.generateTokenProvider.generateToken(newUser);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid google token');
    }
  }
}
/*
LoginTicket {
  envelope: {
    alg: '*************************',
    kid: '*************************',
    typ: 'JWT'
  },
  payload: {
    iss: '*************************',
    azp: '*************************',
    aud: '*************************',
    sub: '*************************',
    email: '*************************',
    email_verified: true,
    nbf: 1740448713,
    name: 'bagor bagor',
    picture: '*************************',
    given_name: 'bagor',
    family_name: 'bagor',
    iat: 1740449013,
    exp: 1740452613,
    jti: '*************************'
  }
}
 */
