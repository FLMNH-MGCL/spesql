import { Entity, PrimaryKey, Property, Enum, Unique } from '@mikro-orm/core';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  GUEST = 'GUEST',
}

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  username!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Enum(() => UserRole)
  role!: UserRole;

  @Property()
  password!: string; // this is a hash

  constructor() {}

  async verifyPassword(password: string) {
    if (this.password) {
      return bcrypt.compare(password, this.password.toString());
    } else {
      return false;
    }
  }
}
