import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  csrfToken: string;

  @Field(() => User, { nullable: true })
  user: User;
}
