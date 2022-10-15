import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: './src/graphql/schema.graphql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    PostsModule,
    ProfilesModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
