import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunzionalitaService } from '../services/funzionalita.service';
import { Ricetta } from '../interface/Ricetta.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ricetta!: Ricetta;  numPeople: number = 1;

  ricette : Ricetta[] = [];
  selectedRicetta : any;
  modificaRicetta: any = {}; 
  constructor(
    private route: ActivatedRoute,
    private funzionalitaService: FunzionalitaService,
    private router: Router 
  ) {}
  originalIngredienti: { ingrediente: string, quantita: number }[] = [];
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.funzionalitaService.getRicettaById(+id).then((ricetta: Ricetta) => {
        this.ricetta = ricetta;
        this.originalIngredienti = JSON.parse(JSON.stringify(ricetta.ingredienti));
      });
    }
  }
  calcolaIngredienti() {
    this.ricetta.ingredienti = this.originalIngredienti.map(ingrediente => ({
      ingrediente: ingrediente.ingrediente,
      quantita: (Number(ingrediente.quantita) * this.numPeople).toString()
    }));
  }
  onDelete(id: number):void{

      fetch(`http://localhost:3000/ricette/${id}`, { method: 'DELETE' })
        .then((response) => response.json())
        .then((ricetta: any) => {
          console.log('Ricetta rimossa con successo da JSON Server', ricetta);
          this.caricaRicette();
          this.router.navigate(['/ricette']);  
        });
    
  }
  caricaRicette(): void {
    fetch('http://localhost:3000/ricette')
      .then((response) => response.json())
      .then((ricette: any[]) => {
        this.ricette = ricette;
        console.log(
          'Ricette caricate con successo da JSON Server',
          this.ricette
        );
      });
  }
  
  onModify(id: number):void{
    console.log(this.ricetta.id);
  }
  selezionaRicetta(ricetta: any): void {
    this.selectedRicetta = ricetta;
  }



  salvaModifiche(): void {
    const id = this.modificaRicetta.id;

    const ingrediente = this.modificaRicetta.ingredienti
      .split(';')
      .map((ingredienteQuantita: string) => {
        const parti = ingredienteQuantita.split(':');
        return {
          ingrediente: parti[0],
          quantita: parti[1],
        };
      });

    const ricettaData = {
      nome: this.modificaRicetta.nome,
      descrizione: this.modificaRicetta.descrizione,
      ingredienti: ingrediente,
      istruzioni: this.modificaRicetta.istruzioni,
      tempoEsecuzione: this.modificaRicetta.tempoEsecuzione,
      difficolta: this.modificaRicetta.difficolta,
      immagine: this.modificaRicetta.immagine,
    };

    fetch(`http://localhost:3000/ricette/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ricettaData),
    })
      .then((response) => response.json())
      .then((ricetta: any) => {
        console.log('Ricetta modificata con successo da JSON Server', ricetta);
        this.caricaRicette();
        this.selectedRicetta = ricetta; // Aggiorna i dettagli visualizzati
      });
  }
}