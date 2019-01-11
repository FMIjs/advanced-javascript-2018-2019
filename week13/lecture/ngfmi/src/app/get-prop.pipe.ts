import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProp'
})
export class GetPropPipe implements PipeTransform {

  transform(obj: any, propName: string): any {
    return obj[propName];
  }

}
