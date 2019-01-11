import { Component, DoCheck, Injector, QueryList } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { someValue } from './app.module';
import { maxValueValidatorFactory, MaxValueDirective } from './max-value.directive';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user';
import { map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'ngfmi';
  showTest = true;
  form: FormGroup;

  // @ViewChild('myInput') element;
  // @ViewChildren(MaxValueDirective, { read: ElementRef }) maxValueDirectives: QueryList<ElementRef>;

  // @ContentChild(MaxValueDirective) contentElement;

  user = {
    name: 'Ivan',
    age: 20
  };

  authUser$: Observable<IUser>;

  // ngAfterContentInit() {
  //   console.log(this.contentElement);
  // }

  // ngAfterViewInit() {
  //   console.log(this.maxValueDirectives);
  // }

  constructor(injector: Injector, fb: FormBuilder, public storeService: StoreService) {

    this.authUser$ = storeService.store$.pipe(map(state => state.authUser));
    // this.authUser$.subscribe(authUser => this.user = authUser);

    // const someValues2 = injector.get('SomeValue', null);
    // console.log(someValues2);


    // setTimeout(() => {
    //   this.user.name = '1';
    // }, 500);
    // this.form = fb.group({
    //   name: fb.control('Ivan'),
    //   age: fb.control(20, maxValueValidatorFactory(20))
    // });
  }

  getProp(obj, prop) {
    return obj[prop];
  }

  inputChangeHandler(value) {
    this.title = value;
  }

  ngDoCheck() {
    console.log('Checking...');
  }

  handleEvent(data) {
    this.storeService.update({ authUser: this.user });
    // console.log(data);
  }

  toggleTest() {
    this.showTest = !this.showTest;
  }
}
