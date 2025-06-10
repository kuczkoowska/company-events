import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeRange'
})
export class TimeRangePipe implements PipeTransform {
  transform(start: string, end: string): string {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  }
}
