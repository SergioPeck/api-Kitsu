import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/google')
  loginWithGoogle(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createWithGoogle(createAuthDto.idToken);
  }

  @Post('/login/email')
  loginWithEmail(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createWithEmail(createAuthDto.idToken);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
