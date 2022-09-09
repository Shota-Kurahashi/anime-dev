import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [PrismaModule],
})
export class PostsModule {}
