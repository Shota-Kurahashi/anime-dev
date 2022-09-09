import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtRtStrategy } from '../auth/strategy/jwtRefresh.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  providers: [ProfilesResolver, ProfilesService, JwtStrategy, JwtRtStrategy],
  imports: [PrismaModule],
  exports: [ProfilesService],
})
export class ProfilesModule {}
