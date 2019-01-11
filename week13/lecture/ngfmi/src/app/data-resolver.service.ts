import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.loaderService.toggleLoader();
    // return this.userService.loadUser(route.params.id).pipe(tap(() => {
    //   this.loaderService.toggleLoader();
    // }));
    return true;
  }
}
