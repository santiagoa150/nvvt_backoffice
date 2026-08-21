import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthRepository } from '../../../domain/repository/auth.repository';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { RoundedButtonAtom } from '../../atom/button/rounded-button/rounded-button.atom';

/**
 * This file defines the Login Page component.
 * It is responsible for authenticating a user against the auth API.
 */
@Component({
	selector: 'app-login-page',
	templateUrl: './login.page.html',
	imports: [ReactiveFormsModule, TranslatePipe, RoundedButtonAtom, RouterLink],
})
export class LoginPage {
	private readonly formBuilder = inject(FormBuilder);
	private readonly authRepository = inject<AuthRepository>(SharedInjectionTokens.AUTH_REPOSITORY);
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	private readonly router = inject(Router);

	protected readonly form = this.formBuilder.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	protected readonly isSubmitting = signal(false);
	protected readonly hasError = signal(false);

	/**
	 * This method is called when the user submits the login form.
	 * It authenticates against the auth API and stores the resulting session tokens.
	 */
	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.hasError.set(false);
		this.isSubmitting.set(true);
		const { email, password } = this.form.getRawValue();

		this.authRepository.login(email, password).subscribe({
			next: (tokens) => {
				this.tokenRepository.save(tokens);
				this.isSubmitting.set(false);
				this.router.navigateByUrl('/campaign');
			},
			error: () => {
				this.isSubmitting.set(false);
				this.hasError.set(true);
			},
		});
	}
}
