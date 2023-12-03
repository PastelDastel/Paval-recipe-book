import { Component, OnInit } from '@angular/core';
import { FunzionalitaService } from '../services/funzionalita.service';
import { Ricetta } from '../interface/Ricetta.module';

@Component({
  selector: 'app-ricette',
  templateUrl: './ricette.component.html',
  styleUrls: ['./ricette.component.css']
})
export class RicetteComponent implements OnInit {
  ricette: Ricetta[] = [];

  constructor(private funzionalitaService : FunzionalitaService) { }

  ngOnInit(): void {
    this.funzionalitaService.searchResults.subscribe((ricette: Ricetta[]) => {
      if (ricette.length > 0) {
        this.ricette = ricette;
      } else {
        this.funzionalitaService.getRicette().then((ricette : Ricetta[]) : void => {
          this.ricette = ricette;
        });
      }
    });
  }
}