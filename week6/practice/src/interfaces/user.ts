import { IBaseEntity } from './base';

export interface IUser extends IBaseEntity {
  name: string;
  age: number;
}