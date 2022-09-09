import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/acessToken.guard';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.profilesService.findOne(userId);
  }

  @Mutation(() => Profile)
  @UseGuards(AccessTokenGuard)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @CurrentUser() user: User,
  ) {
    return this.profilesService.update(user.id, updateProfileInput);
  }
}
