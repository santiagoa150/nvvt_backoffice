import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RoundedButtonAtom } from '../../atom/button/rounded-button/rounded-button.atom';

/**
 * This file defines the Landing Page component.
 * It is responsible for presenting the application to first-time visitors.
 */
@Component({
	selector: 'app-landing-page',
	templateUrl: './landing.page.html',
	imports: [RouterLink, TranslatePipe, RoundedButtonAtom],
})
export class LandingPage {}
