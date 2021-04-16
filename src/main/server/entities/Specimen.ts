import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { CollectionEvent } from './CollectionEvent';
import { Lab } from './Lab';
import { Loan } from './Loan';
import { Taxonomy } from './Taxonomy';
import { Storage } from './Storage';

@Entity()
export class Specimen {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  catalogNumber!: string;

  @Unique()
  @Property({ nullable: true })
  otherCatalogNumber?: string;

  @Property({ nullable: true })
  recordNumber?: string;

  @Property({ nullable: true })
  projectNumber?: string;

  @Property({ nullable: true })
  otherIdentifier?: string;

  @Property({ default: false })
  reared?: boolean;

  @Property({ default: false })
  withholdData?: boolean; // nullable,

  //=== RELATIONS ===//

  @ManyToOne({ nullable: false })
  lab!: Lab;

  @ManyToOne({ nullable: true })
  taxonomy?: Taxonomy;

  @OneToOne()
  collectionEvent?: CollectionEvent;

  @OneToOne({ nullable: true })
  loan?: Loan;

  @OneToOne({ nullable: true }) // FIXME: this might not be the correct relation
  storage?: Storage;

  constructor() {
    // TODO:
  }
}
