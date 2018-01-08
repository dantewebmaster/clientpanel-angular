import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/client';

@Component({
	selector: 'app-edit-client',
	templateUrl: './edit-client.component.html',
	styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

	disableBalanceOnEdit: boolean;
	id: string;
	client: Client = {
		firstName: '',
		lastName: '',
		clientEmail: '',
		clientPhone: '',
		balance: 0,
	}

	constructor(
		private clientService: ClientService,
		private settingsService: SettingsService,
		private router: Router,
		private route: ActivatedRoute,
		private flashMessagesService: FlashMessagesService
	) { }
	
	ngOnInit() {
		this.id = this.route.snapshot.params['id'];

		// Get client
		this.clientService.getClient(this.id).subscribe(client => {
			this.client = client;
		})

		this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
	}
	
	onSubmit({ value, valid }: { value: Client, valid: boolean }) {
		if (!valid) {
			this.flashMessagesService.show('There are errors with the form!', {
				cssClass: 'alert-warning',
				timeout: 3000
			});
			this.router.navigate(['edit-client/' + this.id]);
		} else {
			// Add new client
			this.clientService.updateClient(this.id, value);
			this.flashMessagesService.show('Client updated!', {
				cssClass: 'alert-success',
				timeout: 3000
			});
			this.router.navigate(['/client/' + this.id]);
		}
		console.log( value );
	}
}
