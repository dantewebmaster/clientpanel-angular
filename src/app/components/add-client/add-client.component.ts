import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
	selector: 'app-add-client',
	templateUrl: './add-client.component.html',
	styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
	
	disableBalanceOnAdd: boolean;

	client: Client = {
		firstName: '',
		lastName: '',
		clientEmail: '',
		clientPhone: '',
		balance: 0
	}

	constructor(
		private flashMessagesService: FlashMessagesService,
		private router: Router,
		private clientService: ClientService,
		private settingsService: SettingsService,
	) { }
	
	ngOnInit() {
		this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
	}

	onSubmit({value, valid}: {value: Client, valid: boolean}) {
		if(this.disableBalanceOnAdd) {
			value.balance = 0;
		}
		if (!valid) {
			this.flashMessagesService.show('There are errors with the form!', {
				cssClass: 'alert-warning',
				timeout: 3000
			});
			this.router.navigate(['add-client']);
		} else {
			// Add new client
			this.clientService.newClient(value);
			this.flashMessagesService.show('New client added!', {
				cssClass: 'alert-success',
				timeout: 3000
			});
			this.router.navigate(['/']);			
		}
	}
	
}
