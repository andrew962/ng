import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { NewItemList } from '../../models/newitem.model';
import { DialogCreateNewComponent } from './dialog-create-new.component';

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
  constructor(
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  updateList(list) {
    this.listItems = list;
    this.listItemsChange.emit(list);
  }

  itemSelected(event) {
    this.itemSelectedChange.emit(event);
  }
  btnAddNote() {
    let dialogRef = this.dialog.open(DialogCreateNewComponent);
    dialogRef.afterClosed().subscribe((res: NewItemList) => {
      if (res.Title != null) {
        this.listItems.push(res);
      }
    });
  }
  btnDelete(i: number) {
    this.listItems.splice(i, 1);
  }
}
