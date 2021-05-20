import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class CollectionLocation {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  stateProvince?: string;

  @Property({ nullable: true })
  country?: string;

  @Property({ nullable: true })
  municipality?: string;

  @Property({ nullable: true })
  locality?: string;

  @Property({ nullable: true })
  elevationInMeters?: string;

  @Property({ columnType: 'DECIMAL(10,8)', nullable: true })
  decimalLatitude?: number;

  @Property({ columnType: 'DECIMAL(11,8)', nullable: true })
  decimalLongitude?: number;

  @Property({ nullable: true })
  geodeticDatum?: string;

  @Property({ nullable: true })
  corrdinateUncertainty?: string;

  @Property({ nullable: true })
  verbatimLatitude?: string;

  @Property({ nullable: true })
  verbatimLongitude?: string;
}
