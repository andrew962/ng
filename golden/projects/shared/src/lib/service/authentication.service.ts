import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { CurrentUser } from '../interfaces/currentUser.model';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserPath } from '../enums/user.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  isLogged$: Observable<boolean>;
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser$: Observable<CurrentUser>;
  private currentUserSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);
  superUser$: Observable<boolean>;
  private superUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.isLogged$ = this.isLoggedSubject.asObservable();
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.superUser$ = this.superUserSubject.asObservable();
  }

  ngOnDestroy(): void {

  }
  firebaseAuth() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
      if (r != null) {
        this.db.database.ref(UserPath.DbUsersPath).child(r.user.uid).get().then(response => {
          this.superUserSubject.next(response.val().SuperUser);
        })
        this.setCurrentUser(r.user)
        return {
          isAuth: true
        }
      }
    })
  }

  firebaseLogout() {
    this.afAuth.signOut().then(() => {
      this.isLoggedSubject.next(false);
      this.currentUserSubject.next(null);
      this.router.navigateByUrl('/');
    })
  }

  setCurrentUser(r: firebase.User) {
    let currentUser: CurrentUser = {
      Uid: r.uid,
      UserName: r.displayName,
      UserEmail: r.email,
      PhotoURL: r.photoURL
    }
    this.isLoggedSubject.next(true);
    this.currentUserSubject.next(currentUser);
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  checkState() {
    return this.afAuth.authState.subscribe({
      next: r => {
        if (r != null && r?.uid != null && r?.email != null) {
          this.db.database.ref(UserPath.DbUsersPath).child(r.uid).get().then(response => {
            this.superUserSubject.next(response.val().SuperUser);
          })
          this.isLoggedSubject.next(true);
          this.setCurrentUser(r)
        } else {
          this.isLoggedSubject.next(false);
        }
      }, error: err => this.isLoggedSubject.next(false)
    })
  }
}