import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { NewItemList } from '../../models/newitem.model';

@Component({
  selector: 'app-list-manage',
  templateUrl: './list-manage.component.html',
  styles: [
  ]
})
export class ListManageComponent implements OnInit {
  @Input() listItems: NewItemList[];
  @Output() listItemsChange = new EventEmitter<NewItemList[]>();

  @Output() itemSelectedChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  updateList(list) {
    this.listItems = list;
    this.listItemsChange.emit(list)
  }
  itemSelected(event) {
    this.itemSelectedChange.emit(event);
  }
  btnDelete(i: number) {
    this.listItems.splice(i, 1);
  }
}
