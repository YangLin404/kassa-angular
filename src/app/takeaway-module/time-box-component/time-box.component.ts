import {Component, Input, OnInit, Output} from '@angular/core';
import {TimeBoxService} from './time-box.service';
import {TimeFrame} from './time-frame';

@Component({
  selector: 'app-time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.css']
})

export class TimeBoxComponent implements OnInit {

  @Input()
  takenTimes: string[] = [];
  times: TimeFrame[];

  constructor(private timeBoxService: TimeBoxService) {}

  ngOnInit(): void {
    this.times = this.timeBoxService.getTimeFrames();

    if (this.takenTimes !== null || this.takenTimes.length !== 0) {
      this.registerTakenTime();
    }
  }

  private registerTakenTime(): void {
      this.takenTimes.forEach(takenTime => {
        this.changeTimeFrameStatus(takenTime, true);
      });
  }

  private changeTimeFrameStatus(takenTime: string, taken: boolean) {
    this.times.find( t => t.isSameTime(takenTime))
      .taken = true;
  }

  @Output()
  updateTime(takenTime: string, taken: boolean): void {
    this.changeTimeFrameStatus(takenTime, taken);
  }
}
