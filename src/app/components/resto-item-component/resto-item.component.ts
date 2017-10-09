import {Component, OnInit} from '@angular/core';
import {RestoItem} from './resto-item';
import {RestoItemService} from './resto-item.service';

@Component({
  selector: 'app-resto-item',
  templateUrl: './resto-item.component.html'
})

export class RestoItemComponent implements OnInit {
  items: RestoItem[] = [];

  constructor(private restoItemService: RestoItemService) {}
  ngOnInit(): void {
    this.restoItemService.getItems().then(items => this.items = items);
  }

}
