import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Loan {
  @PrimaryKey()
  id!: number;

  @Property()
  to!: string;

  @Property()
  at!: Date;

  @Property({ nullable: true })
  returnDate?: Date;

  constructor(to: string, at: Date) {
    this.to = to;
    this.at = at;
  }
}
