import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { RequestStatus } from '../../../renderer/types';

export enum RequstType {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ACCOUNTCREATION = 'ACCOUNTCREATION',
}

export enum RequstStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
}

@Entity()
export class Request {
  @PrimaryKey()
  id!: number;

  @Property()
  at: Date = new Date();

  @Enum(() => RequstType)
  _type!: RequstType;

  @Enum(() => RequestStatus)
  status: RequestStatus = RequestStatus.PENDING;

  @Property()
  title!: string;

  @Property()
  description?: string;

  @Property()
  from!: string;

  @Property()
  username?: string;

  @Property()
  email?: string;

  @Property()
  institution?: string;

  @Property()
  query!: string;
}
