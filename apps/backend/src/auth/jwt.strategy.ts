import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/auth.types';
import { ConfigService } from '@nestjs/config';
import { UserProfile } from 'src/user/types/user.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
    });
  }

  validate(payload: JwtPayload) {
    const userProfile: UserProfile = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
    return userProfile;
  }
}
