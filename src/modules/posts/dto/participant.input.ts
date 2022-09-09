import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ParticipantInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  userId!: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  postId!: string;
}
