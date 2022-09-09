import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/acessToken.guard';
import { ParticipantInput } from './dto/participant.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: any,
  ) {
    return this.postsService.create(createPostInput, context.req.ip);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'popular' })
  findPopular() {
    return this.postsService.findPopular();
  }

  @Query(() => [Post], { name: 'userPosts' })
  findUser(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findUser(id);
  }

  @Query(() => [Post], { name: 'follower' })
  @UseGuards(AccessTokenGuard)
  findFollowerAndSelf(@CurrentUser() user: User) {
    return this.postsService.findFollowerAndSelf(user.id);
  }
  @Query(() => [Post], { name: 'like' })
  @UseGuards(AccessTokenGuard)
  findLike(@CurrentUser() user: User) {
    return this.postsService.findLike(user.id);
  }

  @Mutation(() => Post, { name: 'participant' })
  participant(@Args('participantInput') participantInput: ParticipantInput) {
    return this.postsService.participants(
      participantInput.userId,
      participantInput.postId,
    );
  }

  @Mutation(() => Post)
  @UseGuards(AccessTokenGuard)
  like(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.postsService.like(user.id, id);
  }

  @Mutation(() => Post)
  @UseGuards(AccessTokenGuard)
  removePost(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.postsService.remove(user.id, id);
  }
}
