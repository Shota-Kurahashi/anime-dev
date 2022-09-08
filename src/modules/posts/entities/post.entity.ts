import { Field, Int } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from './category.enum';
import { PostCount } from './post-count.output';
import { Role } from './role.enum';

@ObjectType()
export class Post {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Float, { nullable: true })
  ipaddress!: number | null;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Role, { nullable: false, defaultValue: 'ANONYMOUS' })
  authorRole!: keyof typeof Role;

  @Field(() => String, { nullable: false })
  authorName!: string;

  @Field(() => Date, { nullable: false })
  startTime!: Date;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: true })
  episode!: number | null;

  @Field(() => Category, { nullable: false, defaultValue: 'Unknown' })
  category!: keyof typeof Category;

  @Field(() => String, { nullable: true })
  content!: string | null;

  @Field(() => [String], { nullable: true })
  participant!: Array<string>;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [String], { nullable: true })
  like!: Array<string>;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  public!: boolean;

  @Field(() => String, { nullable: true })
  url!: string | null;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  deleted!: boolean;

  @Field(() => PostCount, { nullable: false })
  _count?: PostCount;
}
