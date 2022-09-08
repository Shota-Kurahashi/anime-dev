import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { AccessTokenGuard } from '../auth/guards/acessToken.guard';
import { UseGuards } from '@nestjs/common';
import { FollowUserInput } from './dto/follow-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByName' })
  findOneByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.usersService.findOneByUsername(username);
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard)
  follow(
    @Args('followUserInput') followUserInput: FollowUserInput,
    @CurrentUser() user: User,
  ) {
    return this.usersService.follow(user.id, followUserInput);
  }

  @Mutation(() => User)
  @UseGuards(AccessTokenGuard)
  removeUser(@CurrentUser() user: User) {
    return this.usersService.remove(user.id);
  }
}
