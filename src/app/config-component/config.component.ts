
import {Component, OnInit} from '@angular/core';
import {ConfigService} from './config.service';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})

export class ConfigComponent implements OnInit{
  private _success = new Subject<string>();
  message: string;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this._success.subscribe((message) => this.message = message);
    debounceTime.call(this._success, 3000).subscribe(() => this.message = null);
  }


  reloadData() {
    this.configService.reloadData()
      .then(success => {
        if (success) {
          this.showAlert('reload data successed');
        }
      });
  }

  private showAlert(msg: string) {
    this._success.next(msg);

  }
}
