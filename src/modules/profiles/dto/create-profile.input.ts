import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
