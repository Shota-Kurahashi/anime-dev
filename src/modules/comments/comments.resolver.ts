import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(@Args('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Mutation(() => Comment, { name: 'commentLike' })
  like(@Args('userId') userId: string, @Args('commentId') commentId: string) {
    return this.commentsService.like(userId, commentId);
  }

  @Mutation(() => Comment)
  unLike(@Args('userId') userId: string, @Args('commentId') commentId: string) {
    return this.commentsService.unLike(userId, commentId);
  }
}
