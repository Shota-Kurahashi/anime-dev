import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProfileInput: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...createProfileInput,
      },
    });
  }

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

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }
}
