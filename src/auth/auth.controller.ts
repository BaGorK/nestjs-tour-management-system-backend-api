import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './providers/auth.service';

@Controller('/api/v1/auth')
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
}
