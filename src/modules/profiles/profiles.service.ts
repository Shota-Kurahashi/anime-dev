import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new ForbiddenException('Not Profile');
    }

    return profile;
  }

  update(id: string, updateProfileInput: UpdateProfileInput) {
    return this.prisma.profile.update({
      where: {
        userId: id,
      },
      data: {
        ...updateProfileInput,
      },
    });
  }
}
