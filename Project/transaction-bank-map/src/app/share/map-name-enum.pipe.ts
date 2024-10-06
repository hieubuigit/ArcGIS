import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from './common';

@Pipe({
  name: 'mapNameEnum',
  standalone: true
})
export class MapNameEnumPipe implements PipeTransform {
  transform(value: any, enumType: SelectItem<any>[]): string {
    const item = enumType.find(x => x.value == value);
    return item?.name ?? '';
  }
}
