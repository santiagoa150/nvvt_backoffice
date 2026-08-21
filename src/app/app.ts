import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderOrganism } from './shared/ui/organism/header/header.organism';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderOrganism],
	templateUrl: './app.html',
})
export class App {}
