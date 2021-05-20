import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

// FIXME: this structure will need to be reworked. I currently had the taxnomies
// linked to multiple specimen, but I feel like this may present with issues if
// one specimen needs an update to the taxonomy while another with the same
// does not. Both will be updated. Originally I did this to save space, but
// an alternate solution will need to be used.

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
}
