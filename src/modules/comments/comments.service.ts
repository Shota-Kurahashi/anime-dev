import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCommentInput: CreateCommentInput) {
    return this.prisma.comment.create({
      data: {
        ...createCommentInput,
      },
    });
  }

  findAll(postId: string) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async like(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.likes.includes(userId)) {
      //*いいねを外す
      const likes = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            set: comment.likes.filter((id) => id !== userId),
          },
        },
      });
      return likes;
    } else {
      //*いいねをつける
      const likes = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            push: userId,
          },
        },
      });
      return likes;
    }
  }
  async unLike(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.unLiked.includes(userId)) {
      //*いいねを外す
      const unLiked = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          unLiked: {
            set: comment.unLiked.filter((id) => id !== userId),
          },
        },
      });
      return unLiked;
    } else {
      //*いいねをつける
      const unLiked = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          unLiked: {
            push: userId,
          },
        },
      });
      return unLiked;
    }
  }
}
