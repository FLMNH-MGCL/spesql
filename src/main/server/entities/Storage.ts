import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Storage {
  @PrimaryKey()
  id!: number;

  @Property()
  rack?: string;

  @Property()
  freezer?: string;

  @Property()
  box?: string;

  @Property()
  tubeSize?: string;

  constructor() {
    // TODO
  }
}
