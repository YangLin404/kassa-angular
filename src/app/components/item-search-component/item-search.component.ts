import {Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RestoItem} from './resto-item';
import {ItemSearchService} from './item-search.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html'
})

export class ItemSearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  items: RestoItem[] = [];

  public model: any;

  @Output() onItemSelected = new EventEmitter<string>();

  constructor(private itemSearchService: ItemSearchService) {}

  ngOnInit(): void {
    this.itemSearchService.getItems().then(items => this.items = items);
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.items.filter(item => this.doesItMatch(item, term)).slice(0, 10))

   formatter = (x: {quicklink: string}) => '';

  itemSelected(selectedItem: NgbTypeaheadSelectItemEvent): void {
    const item: RestoItem = selectedItem.item;
    // send call to parent
    this.onItemSelected.emit(item.quicklink);
    // refocus and clear the input
    this.resetSearchInput();
  }

  private doesItMatch(item: RestoItem, term: string): boolean {
    term = term.toLowerCase();
    return (item.quicklink.toLowerCase().indexOf(term) > -1) || (item.name.toLowerCase().indexOf(term) > -1);
  }

  private resetSearchInput(): void {

    this.searchInput.nativeElement.focus();
  }
}
