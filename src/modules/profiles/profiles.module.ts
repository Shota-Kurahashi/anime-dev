import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ProfilesResolver, ProfilesService],
  imports: [PrismaModule],
  exports: [ProfilesService],
})
export class ProfilesModule {}
