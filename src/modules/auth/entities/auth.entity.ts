import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  csrfToken: string;
}
