import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
