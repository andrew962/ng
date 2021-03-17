import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';
import { PermissionsService } from 'projects/shared/src/lib/service/permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private permissionsService: PermissionsService) { }

  ngOnInit(): void {
  }
  test() {
    this.permissionsService.setPermissions()
  }


}
