import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Profile {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => [String], { nullable: true })
  favorite!: Array<string>;

  @Field(() => String, { nullable: true })
  twitterId!: string | null;

  @Field(() => String, { nullable: true })
  facebookId!: string | null;

  @Field(() => String, { nullable: true })
  youtubeId!: string | null;

  @Field(() => String, { nullable: true })
  instagramId!: string | null;

  @Field(() => String, { nullable: true })
  tiktokId!: string | null;

  @Field(() => String, { nullable: true })
  img!: string | null;
}
