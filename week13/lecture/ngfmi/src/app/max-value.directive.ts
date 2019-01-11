import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, throttleTime, debounceTime } from 'rxjs/operators';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

export function maxValueValidatorFactory(maxValue: number) {
  return function validateMaxValue(control: AbstractControl): ValidationErrors | null {
    return control.value <= maxValue ? null : { maxValue: true };
  };
}

@Directive({
  selector: '[appMaxValue]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxValueDirective,
    multi: true
  }]
})
export class MaxValueDirective implements Validator {
  // @Input() maxValue: number;

  @Input() appMaxValue;

  // constructor(el: ElementRef) {
  //   // fromEvent(el.nativeElement, 'keyup').pipe(
  //   //   map((event: any) => event.target.valueAsNumber),
  //   //   debounceTime(100)
  //   // ).subscribe((currentValue) => {
  //   //   if (currentValue < this.appMaxValue) { return; }
  //   //   el.nativeElement.value = this.appMaxValue;
  //   // });
  // }

  validate(control: AbstractControl): ValidationErrors | null {
    return maxValueValidatorFactory(this.appMaxValue)(control);
    // return control.value <= this.appMaxValue ? null : { maxValue: true };
  }

}
