import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/shared/src/lib/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit(): void {
    this.authenticationService.checkState()
  }
  title = 'catalleyaWeb';
}
