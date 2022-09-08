import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FollowUserInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  followingUserId!: string;
}
