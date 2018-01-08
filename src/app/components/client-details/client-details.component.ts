import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
	id: string;
	client: Client;
	hasBalance: boolean = false;
	showBalanceUpdateInput: boolean = false;

	constructor(
		private clientService: ClientService,
		private router: Router,
		private route: ActivatedRoute,
		private flashMessagesService: FlashMessagesService
	) { }
	
	ngOnInit() {
		// Get id from url
		this.id = this.route.snapshot.params['id'];

		// Get client
		this.clientService.getClient(this.id).subscribe(client => {
			if(client && client.balance > 0) {
				this.hasBalance = true;
			}
			this.client = client;
			console.log(this.client);
		});
	}

	updateBalance(id: string) {
		this.clientService.updateClient(this.id, this.client);
		this.flashMessagesService.show('Balance updated!', {
			cssClass: 'alert-success',
			timeout: 3000
		});
		this.router.navigate(['/client/' + this.id]);
		this.showBalanceUpdateInput = false;
	}

	onDeleteClick() {
		if(confirm("Are you sure to delete?")) {
			this.clientService.deleteClient(this.id);
			this.flashMessagesService.show('Client deleted!', {
				cssClass: 'alert-success',
				timeout: 3000
			});
			this.router.navigate(['/']);
		}
	}
	
}
