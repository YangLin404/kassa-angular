export class TimeFrame {
  hour: number;
  minut: number;
  time: string;
  taken: boolean;

  constructor(hour: number, minut: number) {
    this.hour = hour;
    this.minut = minut;
    this.time = this.hour + ':' + (this.minut < 10 ? '0' + this.minut : this.minut);
    this.taken = false;
  }

  isSameTime(time: string) {
    return time === this.time;
  }
}
