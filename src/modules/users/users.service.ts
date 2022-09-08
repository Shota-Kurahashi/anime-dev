import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
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

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
