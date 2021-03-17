import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements OnDestroy {
  private uid: string;
  authSubscription: Subscription;
  private readonly rule = false
  constructor(
    private auth: AuthenticationService,
    private afDatabase: AngularFireDatabase,
  ) {
    this.authSubscription = this.auth.currentUser$.subscribe(u => this.uid = u?.Uid);
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  setPermissions() {

  }
}
