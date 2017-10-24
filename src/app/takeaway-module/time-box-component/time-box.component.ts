import {Component, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {TimeBoxService} from './time-box.service';
import {TimeFrame} from './time-frame';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';
import {isUndefined} from 'util';

@Component({
  selector: 'app-time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.css']
})

export class TimeBoxComponent implements OnInit {

  @Input() takenTimes: string[] = [];
  @Input() isModal: false;
  times: TimeFrame[];

  constructor(private timeBoxService: TimeBoxService,
              public activeModal: NgbActiveModal,
              private logger: NGXLogger) {}

  ngOnInit(): void {
    this.times = this.timeBoxService.getTimeFrames();
    this.logger.debug('takentimes oninit: ' + this.takenTimes);
    if (this.takenTimes !== null || this.takenTimes.length !== 0) {
      this.registerTakenTime();
    }
  }

  @Output()
  updateView(): void {
    this.registerTakenTime();
  }

  choseTime(time: string): void {
    this.activeModal.close(time);
  }

  private registerTakenTime(): void {
    this.times = this.timeBoxService.getTimeFrames();
    this.takenTimes.forEach(takenTime => {
      this.changeTimeFrameStatus(takenTime, true);
    });
    this.logger.debug('taken time after registertion: ' + this.takenTimes);
    this.logger.debug('times after registretion: ' + JSON.stringify(this.times));
  }

  private changeTimeFrameStatus(takenTime: string, taken: boolean) {
    this.logger.log('changing timeframe status ' + takenTime + ': ' + taken);
    const timeFrameToChange = this.times.find( t => t.isSameTime(takenTime));
    if (!isUndefined(timeFrameToChange)) {
      this.logger.debug('found timeframe object: ' + JSON.stringify(timeFrameToChange));
      timeFrameToChange.taken = taken;
      let index = this.times.indexOf(timeFrameToChange);
      const indexToReach = index >= 4 ? index - 4 : 0;
      for (index = index + 3; index > indexToReach; index--) {
        if (!this.times[index].taken) {
          this.times[index].warning = taken;
        }
      }
    }
  }
}
