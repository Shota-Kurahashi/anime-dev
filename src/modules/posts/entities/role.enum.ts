import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ANONYMOUS = 'ANONYMOUS',
  AUTHENTICATED = 'AUTHENTICATED',
}

registerEnumType(Role, { name: 'Role', description: undefined });
