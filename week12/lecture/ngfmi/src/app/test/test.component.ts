import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  @Input() name: string;
  // tslint:disable-next-line:no-output-rename
  @Output('myEvent') myEventEmitter = new EventEmitter<{ data: number }>();

  constructor() {
    console.log('constructor');
    setTimeout(() => {
      this.myEventEmitter.emit({ data: 10000 });
    }, 1000);
  }

  ngOnInit() {
    console.log('init');
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
