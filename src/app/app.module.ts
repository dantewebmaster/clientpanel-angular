import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent, canActivate:[AuthGuard] },
	{ path: 'about', component: AboutComponent },
	{ path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'add-client', component: AddClientComponent, canActivate: [AuthGuard] },
	{ path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
	{ path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		ClientsComponent,
		ClientDetailsComponent,
		AddClientComponent,
		EditClientComponent,
		NavbarComponent,
		SidebarComponent,
		LoginComponent,
		RegisterComponent,
		SettingsComponent,
		PageNotFoundComponent,
		AboutComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,		
		RouterModule.forRoot(appRoutes),
		AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
		AngularFireAuthModule,
		FlashMessagesModule
	],
	providers: [
		AngularFireDatabase,
		AngularFireDatabaseModule,
		ClientService,
		SettingsService,
		AuthService,
		FlashMessagesService,
		AuthGuard,
		RegisterGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
