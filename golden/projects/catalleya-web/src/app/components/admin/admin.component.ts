import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CurrentUser } from 'projects/shared/src/lib/interfaces/currentUser.model';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';
import { FileUploadService } from 'projects/shared/src/lib/service/file-upload.service';
import { UserService } from 'projects/shared/src/lib/service/user.service';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import _ from "underscore";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('eventFile', { static: true }) private eventFile;
  usersList: FormArray = new FormArray([]);
  superUserSubscription: Subscription;
  superUser: boolean = false;
  currentUser$: Observable<CurrentUser>
  constructor(
    private userService: UserService,
    private auth: AuthenticationService,
    private fUpload: FileUploadService
  ) {
    this.superUserSubscription = this.auth.superUser$.subscribe(s => this.superUser = s);
    this.currentUser$ = this.auth.currentUser$;
  }
  ngOnDestroy(): void {
    this.superUserSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userService.getUsers().then(r => {
      r.forEach(item => {
        let group = new FormGroup({
          SuperUser: new FormControl({ value: item.val().SuperUser, disabled: !this.superUser }),
          Permissions: new FormGroup({
            Create: new FormControl({ value: item.val().Permissions.Create, disabled: !this.superUser }),
            Update: new FormControl({ value: item.val().Permissions.Update, disabled: !this.superUser }),
            Delete: new FormControl({ value: item.val().Permissions.Delete, disabled: !this.superUser })
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
    let group = {};
    _.map(this.usersList.value, item => {
      group[item.User.Uid] = item;
    })
    this.userService.updateUsers(group).then(() => 'Done!')
  }
  onFileSelected(event) {
    this.fUpload.upload(event.target.files[0], event.target.files[0].name, 'logo').subscribe(r => {
      console.log(r);

    })
  }
}
