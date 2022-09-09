import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '../prisma/prisma.service';
import { FollowUserInput } from './dto/follow-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        _count: true,
        posts: {
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
      throw new ForbiddenException('Not User');
    }
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        profile: true,
        _count: true,
        posts: {
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
      throw new ForbiddenException('Not User');
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserInput,
        },
      });
      delete updateUser.hashedPassword;
      delete updateUser.hashedRefreshToken;
      return updateUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This username is already taken');
        }
      }
      throw error;
    }
  }

  async follow(id: string, followId: FollowUserInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const followUser = await this.prisma.user.findUnique({
      where: {
        id: followId.followingUserId,
      },
    });

    if (!user || !followUser) {
      throw new ForbiddenException('Not User');
    }

    if (user.id === followUser.id) {
      throw new ForbiddenException('You cannot follow yourself');
    }

    if (user.follow.includes(followUser.id)) {
      //* followを外す
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          follow: {
            set: user.follow.filter((id) => id !== followUser.id),
          },
        },
      });

      await this.prisma.user.update({
        where: {
          id: followUser.id,
        },
        data: {
          followed: {
            set: followUser.followed.filter((id) => id !== user.id),
          },
        },
      });
      return updateUser;
    } else {
      //* followをする
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          follow: {
            push: followUser.id,
          },
        },
      });

      await this.prisma.user.update({
        where: {
          id: followUser.id,
        },
        data: {
          followed: {
            push: user.id,
          },
        },
      });
      return updateUser;
    }
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        loginStatus: false,
        deleted: true,
      },
    });
  }
}
