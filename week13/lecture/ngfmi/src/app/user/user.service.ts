import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { of as observableOf, from as observableFrom, Observable } from 'rxjs';
import { map, filter, delay, distinctUntilChanged, pairwise, startWith, share, count } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = [];

  constructor(public http: HttpClient) {
    // observableOf([1, 2, 2, 4, 4, 4, 3]).pipe(
    //   map(arr => arr.filter(a => a === 2)),
    // ).subscribe(arr => console.log(arr));

    // const stream$ = observableFrom([1, 2, 2, 4, 4, 4, 3]).pipe(
    //   filter(a => a % 2 === 0),
    //   startWith(null),
    //   distinctUntilChanged(),
    //   pairwise(),
    //   share()
    // );

    // stream$.subscribe(a => console.log(a));
    // stream$.subscribe(a => console.log(a));

    // const str$ = new Observable((observer) => {
    //   let counter = 0;
    //   const intervalId = setInterval(() => {
    //     observer.next(++counter);
    //     // observer.complete();
    //     observer.error(new Error());
    //   }, 1000);
    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // });

    // const subscription = str$.subscribe(() => console.log, err => console.error(err), () => console.log('Completed'));
    // subscription.unsubscribe();

    // str$.subscribe({
    //   next: () => { },
    //   error: () => { },
    //   complete: () => { }
    // });
  }

  loadUsers() {
    this.http.get<any>('https://jsonplaceholder.typicode.com/todos/')
      .subscribe(users => this.users = users);
  }
}
