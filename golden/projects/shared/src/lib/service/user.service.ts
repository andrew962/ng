import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { UserPath } from '../enums/user.enum';
import { CurrentUser } from '../interfaces/currentUser.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private readonly rule = false
  private uid: string;
  user: CurrentUser;
  authSubscription: Subscription;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private auth: AuthenticationService
  ) {
    this.authSubscription = this.auth.currentUser$.subscribe(u => {
      this.user = u;
      this.uid = u?.Uid
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  createUser() {
    this.db.database.ref(UserPath.DbUsersPath).child(this.uid).set({
      User: this.user,
      SuperUser: false,
      Permissions: {
        Create: false,
        Update: false,
        Delete: false
      },
      Photos: []
    })
  }
  getUsers() {
    return this.db.database.ref(UserPath.DbUsersPath).get()
  }
  updateUsers(data) {
    return this.db.database.ref(UserPath.DbUsersPath).set(data);
  }
  isAllowedUpdate(uid) {
    this.db.database.ref(UserPath.DbUsersPath).child(uid).child('Permissions').child('Update').get().then(r => {
      return r.val();
    })
  }
}
