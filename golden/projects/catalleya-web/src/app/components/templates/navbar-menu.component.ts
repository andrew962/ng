import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'projects/shared/src/lib/interfaces/currentUser.model';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styles: [
  ]
})
export class NavbarMenuComponent implements OnInit {
  isLogged$: Observable<boolean>;
  currentUser$: Observable<CurrentUser>
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.isLogged$ = this.authenticationService.isLogged$;
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  ngOnInit(): void {}
  loginBtn() {
    this.authenticationService.firebaseAuth().then(response =>
      console.log(response))
  }
  logOut() {
    this.authenticationService.firebaseLogout()
  }

}
