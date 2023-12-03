import { Component, OnInit } from '@angular/core';
import { FunzionalitaService } from '../services/funzionalita.service';
import { Ricetta } from '../interface/Ricetta.module';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  ricette: Ricetta[] = [];
  constructor(private funzionalitaService : FunzionalitaService) { }

  ngOnInit(): void {
    this.funzionalitaService.getRicette().then((ricette : Ricetta[]) : void => {
      this.ricette = ricette;
    });
  }
  
  onSearch(event: Event): void {
    event.preventDefault();
    this.funzionalitaService.searchRicetta(this.searchValue)
  .then((ricette: Ricetta[]) => {
    this.funzionalitaService.updateSearchResults(ricette);
    console.log('asahsdahsd', [...ricette]);  
  })
  .catch(error => {
    console.error('Errore durante la ricerca delle ricette', error);
  });
}
}