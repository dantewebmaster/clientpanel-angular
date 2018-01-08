import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	
	isLoggedIn: boolean;
	loggedInUser: string;
	showRegister: boolean;
	
	constructor(
		private authService: AuthService,
		private settingsService: SettingsService,
		private router: Router,
		private flashMessagesService: FlashMessagesService
	) { }
	
	ngOnInit() {
		this.authService.getAuth().subscribe(auth => {
			if(auth) {
				this.isLoggedIn = true;
				this.loggedInUser = auth.email;
			} else {
				this.isLoggedIn = false;
			}
		});

		this.showRegister = this.settingsService.getSettings().allowRegistration;
	}

	onLogOutClick() {
		this.authService.logout();
		this.flashMessagesService.show('You are logged out!', {
			cssClass:'alert-info',
			timeout: 3000
		});
		this.router.navigate(['/login']);
	}
	
}
