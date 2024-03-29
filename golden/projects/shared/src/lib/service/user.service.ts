import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  isAllowedUpdate() {
    let ref = this.db.database.ref(UserPath.DbUsersPath).child(this.uid).child('Permissions');
    return this.db.object(ref).query.get().then(r => r.val());
  }
}
