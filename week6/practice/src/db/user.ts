import { Base } from './base';
import { IUser } from '../interfaces/user';

export class User extends Base<IUser> {
  constructor() {
    super('users.db');
  }
}