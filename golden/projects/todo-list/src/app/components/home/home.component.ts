import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NewItemList } from '../../models/newitem.model';
import { DialogCreateNewComponent } from '../templates/dialog-create-new.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  listItems: NewItemList[] = [];
  itemSelected: NewItemList;
  itemSelectToEdit: FormGroup;
  constructor(private title: Title,
    private dialog: MatDialog,
    private fb: FormBuilder) {
    this.itemSelectToEdit = fb.group({
      Title: [, Validators.required],
      Content: [],
      Uid: []
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Inicio');
  }

  btnNewItemList() {
    let dialogRef = this.dialog.open(DialogCreateNewComponent);
    dialogRef.afterClosed().subscribe((res: NewItemList) => {
      if (res.Title != null) {
        this.listItems.push(res);
      }
    });
  }
  itemSelectedChange(event: NewItemList) {
    this.itemSelected = event;
    this.itemSelectToEdit.setValue({
      Title: event.Title,
      Content: event.Content,
      Uid: event.Uid
    });
  }
  btnSaveEdited() {
    let selected: NewItemList = _.findWhere(this.listItems, { Uid: this.itemSelectToEdit.controls.Uid.value });
    console.log(this.listItems, selected);
    selected.Title = this.itemSelectToEdit.controls.Title.value;
    selected.Content = this.itemSelectToEdit.controls.Content.value;
    this.itemSelected = null;
  }

}
