import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const cookieExtractor = function(request) {
  let token = null;
  if (request) {
    token = request['headers']['cookie'].split('=')[1];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.secret,
    });
  }

  async validate(payload: any) {
    return { username: payload.username, id: payload.id };
  }
}