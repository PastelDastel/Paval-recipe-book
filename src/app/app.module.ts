import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RicetteComponent } from './ricette/ricette.component';
import { HeaderComponent } from './header/header.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InserisciComponent } from './inserisci/inserisci.component';
import { DetailsComponent } from './details/details.component';
import { ModifyComponent } from './modify/modify.component';

const routes: Routes = [
  { path: '', component: RicetteComponent },
  { path: 'ricette', component: RicetteComponent },
  { path: 'funzionalita/inserisci', component: InserisciComponent, pathMatch: 'full'},
  {path: 'ricette/:id/details', component : DetailsComponent,pathMatch: 'full'},
  {path: 'ricette/:id/modify', component : ModifyComponent,pathMatch: 'full'},

  // Add more routes as needed
];

@NgModule({
  declarations: [
    AppComponent,
    RicetteComponent,
    HeaderComponent,
    InserisciComponent,
    DetailsComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    //angular material
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }