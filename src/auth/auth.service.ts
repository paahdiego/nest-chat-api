import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const _user = user._doc;
    const payload = { username: _user.email, sub: user._id };

    return {
      user: {
        _id: _user._id,
        email: _user.email,
        name: _user.name,
        avatartUrl: _user.avatarUrl,
        phone: _user.phone,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
