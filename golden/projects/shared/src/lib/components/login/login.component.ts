import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  constructor(
    @Inject('appName') public appName: string,
    fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.credentials = fb.group({
      email: [, Validators.required],
      pwd: [, Validators.required]
    })
  }

  ngOnInit(): void {
  }
  loginBtn() {
    // this.authenticationService.firebaseAuth(this.credentials.controls.email.value, this.credentials.controls.pwd.value).then(r => console.log(r))
  }
}
