import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
}
