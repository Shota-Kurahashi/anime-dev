import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      take: 100,
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findPopular() {
    return this.prisma.post.findMany({
      take: 50,
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        comments: {
          _count: 'desc',
        },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
        _count: true,
      },
    });

    if (!post) {
      throw new ForbiddenException('Not Post');
    }
    return post;
  }

  async findUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          take: 100,
          include: {
            comments: true,
            _count: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('ユーザが見つかりません');
    }

    return user.posts;
  }

  async findFollowerAndSelf(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          take: 100,
          include: {
            comments: true,
            _count: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('ユーザが見つかりません');
    }
    const followerPosts = await Promise.all(
      user.follow.map((followId) => this.findUser(followId)),
    );

    return user.posts.concat(...followerPosts);
  }

  async findLike(id: string) {
    const posts = await this.prisma.post.findMany({
      take: 100,
      where: {
        like: {
          hasEvery: id,
        },
      },
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!posts) {
      throw new ForbiddenException('Not Post');
    }
    return posts;
  }

  async like(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ForbiddenException('No Posts');
    }

    if (post.like.includes(userId)) {
      //* いいねを外す
      const unLikePost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          like: {
            set: post.like.filter((id) => id !== userId),
          },
        },
      });
      return unLikePost;
    } else {
      const likePost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          like: {
            push: userId,
          },
        },
      });
      return likePost;
    }
  }

  async participants(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ForbiddenException('No Posts');
    }

    if (post.participant.includes(userId)) {
      //* 参加を外す
      const participant = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          participant: {
            set: post.participant.filter((id) => id !== userId),
          },
        },
      });
      return participant;
    } else {
      const participant = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          participant: {
            push: userId,
          },
        },
      });
      return participant;
    }
  }

  async remove(userId: string, id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post || post.userId !== userId) {
      throw new ForbiddenException('No permission to delete');
    }
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }
}
