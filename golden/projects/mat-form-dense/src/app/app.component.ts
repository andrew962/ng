import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'mat-form-dense';
  test = new FormControl('', [Validators.required, Validators.maxLength(2)]);
}
