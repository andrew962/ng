import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLogged$: Observable<boolean>;
  isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
    this.isLogged$ = this.isLoggedSubject.asObservable();
  }
}
