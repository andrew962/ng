import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'projects/shared/src/lib/components/login/login.component';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbarmenu',
  templateUrl: './navbarmenu.component.html',
  styles: [
  ]
})
export class NavbarMenuComponent implements OnInit {
  islogged$: Observable<boolean>;
  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.islogged$ = this.authenticationService.isLogged$
  }

  ngOnInit(): void {
  }
  btnOpenDialogLogin(){
    const dialogRef = this.dialog.open(LoginComponent)
  }
}
