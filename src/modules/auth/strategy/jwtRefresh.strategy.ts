import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['refresh_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: { userId: string; email: string }) {
    const refreshToken = req.cookies['refresh_token'];
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    delete user.hashedPassword;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.ipaddress;
    return { ...user, refreshToken };
  }
}
