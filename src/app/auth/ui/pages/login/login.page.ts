import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * This file defines the Login Page component.
 * It is responsible for displaying the login interface.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  imports: [TranslatePipe],
})
export class LoginPage {}
