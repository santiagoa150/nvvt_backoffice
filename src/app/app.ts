import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { HeaderOrganism } from './shared/ui/organisms/header/header.organism';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderOrganism],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	environment = signal(environment.production);
}
