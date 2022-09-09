import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  twitterId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  facebookId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tiktokId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  instagramId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  youtubeId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  img: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  favorite: string[];
}
