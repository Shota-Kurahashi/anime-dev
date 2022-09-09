import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtRtStrategy } from '../auth/strategy/jwtRefresh.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  providers: [UsersResolver, UsersService, JwtStrategy, JwtRtStrategy],
  imports: [PrismaModule],
})
export class UsersModule {}
