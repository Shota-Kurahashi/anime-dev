import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

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
}
