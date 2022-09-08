import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRtStrategy } from './strategy/jwtRefresh.strategy';
import { UsersModule } from '../users/users.module';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy, JwtRtStrategy],
  imports: [PrismaModule, JwtModule.register({}), ProfilesModule],
})
export class AuthModule {}
