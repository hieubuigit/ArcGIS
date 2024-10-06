import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondsToDate',
  standalone: true,
})
export class MillisecondsToDatePipe implements PipeTransform {
  transform(value: number): unknown {
    if (!value) return '';
    const date = new Date(value * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
