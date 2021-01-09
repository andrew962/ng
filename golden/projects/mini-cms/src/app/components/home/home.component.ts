import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

}
