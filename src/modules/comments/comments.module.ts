import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [PrismaModule],
})
export class CommentsModule {}
