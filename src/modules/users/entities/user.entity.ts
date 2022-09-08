import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  hashedPassword!: string;

  @Field(() => String, { nullable: true })
  hashedRefreshToken!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => [Post], { nullable: true })
  posts?: Array<Post>;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [String], { nullable: true })
  follow!: Array<string>;

  @Field(() => [String], { nullable: true })
  followed!: Array<string>;

  @Field(() => Float, { nullable: true })
  ipaddress!: number | null;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  loginStatus!: boolean;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  deleted!: boolean;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
