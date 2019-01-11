import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { IUser } from './interfaces/user';

interface IState {
  authUser: IUser;
  title: string;
}

const initialState: IState = {
  authUser: null,
  title: 'My App'
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store$ = new BehaviorSubject(initialState);
  currentStarte = initialState;

  constructor() { }

  update(updates: Partial<IState>) {
    this.currentStarte = Object.assign({}, this.currentStarte, updates);
    this.store$.next(this.currentStarte);
  }
}
