import { Component,OnInit } from '@angular/core';
import { Ricetta } from '../interface/Ricetta.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FunzionalitaService } from '../services/funzionalita.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  rimuoviIngrediente(index: number) {
    this.ricetta.ingredienti.splice(index, 1);
  }
  ricetta!: Ricetta;
  ricette : Ricetta[] = [];
  selectedRicetta : any;

  constructor(
    private route: ActivatedRoute,
    private funzionalitaService: FunzionalitaService,
    private router: Router 
  ) {}
  ingredientiString!: string;

getIngredientsString(): string {
  this.ingredientiString = this.ricetta.ingredienti.map(i => `${i.ingrediente}:${i.quantita}`).join(';');
  return this.ingredientiString;
}
handleInput(event: Event): void {
  this.ingredientiString = (event.target as HTMLInputElement).value;
}
aggiungiIngrediente() {
  this.ricetta.ingredienti.push({ ingrediente: '', quantita: '0' });
}
modificaRicetta(): void {
  const updatedRicetta = { ...this.ricetta };

  this.funzionalitaService.updateRicetta(this.ricetta.id, updatedRicetta)
    .then((ricetta: Ricetta) => {
      this.ricetta = ricetta;
      this.router.navigate(['/ricette', ricetta.id, 'details']);
    });
}
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.funzionalitaService.getRicettaById(+id).then((ricetta: Ricetta) => {
      this.ricetta = ricetta;
    });
  }
}
}
