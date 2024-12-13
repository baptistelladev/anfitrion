import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDate',
  standalone: true
})
export class MomentDatePipe implements PipeTransform {

  transform(value: string | Date, locale: string, format: string = 'LLL'): string {
    moment.locale(locale);
    return moment(value).format(format);
  }

}
