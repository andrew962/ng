import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { CurrentUser } from '../interfaces/currentUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  isLogged$: Observable<boolean>;
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser$: Observable<CurrentUser>;
  private currentUserSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLogged$ = this.isLoggedSubject.asObservable();
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  ngOnDestroy(): void {

  }
  firebaseAuth() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
      if (r != null) {
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
          this.isLoggedSubject.next(true);
          this.setCurrentUser(r)
        } else {
          this.isLoggedSubject.next(false);
        }
      }, error: err => this.isLoggedSubject.next(false)
    })
  }
}