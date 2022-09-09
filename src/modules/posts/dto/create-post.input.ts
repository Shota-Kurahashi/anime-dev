import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../entities/category.enum';
import { Role } from '../entities/role.enum';

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  userId: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  authorRole?: keyof typeof Role;

  @Field(() => String, { nullable: false })
  @IsOptional()
  @IsString()
  authorName!: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  startTime?: Date | string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  episode?: number;

  @Field(() => Category, { nullable: true })
  @IsOptional()
  category?: keyof typeof Category;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  url?: string;
}
