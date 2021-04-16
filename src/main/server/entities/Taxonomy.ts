import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Taxonomy {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  order?: string;

  @Property({ nullable: true })
  superfamily?: string;

  @Property({ nullable: true })
  family?: string;

  @Property({ nullable: true })
  subfamily?: string;

  @Property({ nullable: true })
  tribe?: string;

  @Property({ nullable: true })
  genus?: string;

  @Property({ nullable: true })
  subgenus?: string;

  @Property({ nullable: true })
  specificEpithet?: string;

  @Property({ nullable: true })
  infraspecificEpithet?: string;

  constructor() {
    // TODO
  }
}
