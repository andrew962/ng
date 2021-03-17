import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'projects/shared/src/lib/interfaces/user.model';
import { UserService } from 'projects/shared/src/lib/service/user.service';
import { of } from 'rxjs';
import _ from "underscore";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {
  usersList: FormArray = new FormArray([]);

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().then(r => {
      r.forEach(item => {
        console.log(item.val());
        let group = new FormGroup({
          Permissions: new FormGroup({
            Create: new FormControl(item.val().Permission.Create),
            Update: new FormControl(item.val().Permission.Update),
            Delete: new FormControl(item.val().Permission.Delete)
          }),
          User: new FormGroup({
            Uid: new FormControl(item.val().User.Uid),
            UserName: new FormControl(item.val().User.UserName),
            UserEmail: new FormControl(item.val().User.UserEmail),
            PhotoURL: new FormControl(item.val().User.PhotoURL)
          })
        })
        this.usersList.push(group)
      })
    })
  }
  createUserBtn() {
    this.userService.createUser()
  }
  updateUsersBtn() {
    this.userService.updateUsers(this.usersList.value).then(r => {
      console.log(r)
    })
  }

}
