import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/isPublic.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Public()
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    return req.user;
  }
}
