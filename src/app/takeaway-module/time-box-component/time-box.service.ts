import {Injectable} from '@angular/core';
import {TimeFrame} from './time-frame';

@Injectable()
export class TimeBoxService {
  private times: TimeFrame[] = [];

  constructor() {
    this.initTimeFrames();
  }

  private initTimeFrames(): void {
    for (let hour = 17; hour < 22; hour++) {
      for (let minut = 0; minut <= 60; minut = minut + 5 ) {
        this.times.push(new TimeFrame(hour, minut));
      }
    }
  }

  getTimeFrames(): TimeFrame[] {
    if (this.times.length === 0) {
      this.initTimeFrames();
    }
    return this.times;
  }
}
