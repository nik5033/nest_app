import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const cookieExtractor = function(request) {
  if (process.env.header == 'Cookie') {
    let token = null;
    if (request && request['headers']['cookie']) {
      token = request['headers']['cookie'].split('=')[1];
    }
    return token;
  }
  else if (process.env.header == 'Authorization'){
    return ExtractJwt.fromAuthHeader();
  }
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