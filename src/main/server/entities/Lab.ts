import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Lab {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ nullable: false })
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}
