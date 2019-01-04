import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, throttleTime, debounceTime } from 'rxjs/operators';
@Directive({
  selector: '[appMaxValue]'
})
export class MaxValueDirective implements OnInit {
  @Input() maxValue: number;

  @Input() appMaxValue;

  constructor(el: ElementRef) {
    fromEvent(el.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.valueAsNumber),
      debounceTime(2000)
    ).subscribe((currentValue) => {
      if (currentValue < this.appMaxValue) { return; }
      el.nativeElement.value = this.appMaxValue;
    });
  }

  ngOnInit() {

    // console.log(this.el.nativeElement.value, this.appMaxValue);
  }
}
