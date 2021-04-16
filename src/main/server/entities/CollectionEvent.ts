import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CollectionLocation } from './CollectionLocation';

@Entity()
export class CollectionEvent {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  recordedBy?: string;

  @Property({ nullable: true })
  identifiedBy?: string;

  @Property({ nullable: true })
  dateIdentified?: Date;

  @Property({ nullable: true })
  verbatimDate?: string;

  @Property({ nullable: true })
  collectedYear?: number;

  @Property({ nullable: true })
  collectedMonth?: number;

  @Property({ nullable: true })
  collectedDay?: number;

  @Property({ nullable: true })
  fieldNotes?: string;

  @Property({ nullable: true })
  otherCollectors?: string[];

  @OneToOne({ nullable: true })
  location?: CollectionLocation;

  constructor() {}
}
