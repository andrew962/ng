import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uid } from "uid";
import { NewItemList } from '../../models/newitem.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-new',
  templateUrl: './dialog-create-new.component.html',
  styles: [
  ]
})
export class DialogCreateNewComponent implements OnInit {
  itemFG: FormGroup;
  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogCreateNewComponent, NewItemList>) {
    this.itemFG = fb.group({
      Title: [, Validators.required],
      Content: []
    })
  }

  ngOnInit(): void {
    this.itemFG.markAllAsTouched();
  }
  btnAdd() {
    let newItem: NewItemList = {
      Uid: uid(16),
      Title: this.itemFG.controls.Title.value,
      Content: this.itemFG.controls.Content.value
    }
    this.dialogRef.close(newItem)
    // alert(JSON.stringify(newItem));
  }
  get disabledBtn(): boolean {
    return this.itemFG.invalid;
  }

}
