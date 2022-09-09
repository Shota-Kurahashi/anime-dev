import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/modules/posts/entities/role.enum';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  postId!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  // @IsNotEmpty()
  ipAddress?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  authorName?: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  authorRole?: keyof typeof Role;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  twitterId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  facebookId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  youtubeId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  instagramId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tiktokId?: string;
}
