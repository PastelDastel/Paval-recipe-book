import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css']
})
export class InserisciComponent implements OnInit {
  rimuoviIngrediente(index: number) {
    this.ingredienti.splice(index, 1);
  }
  
ingredienti: { ingrediente: string, quantita: number }[] = [];

constructor(private router: Router) { }

ngOnInit(): void {
}

aggiungiIngrediente() {
  this.ingredienti.push({ ingrediente: '', quantita: 0 });
}
  
salvaRicetta() {
  const nomeRicetta = (document.getElementById("nome") as HTMLInputElement).value;
  const descrizione = (document.getElementById("descrizione") as HTMLInputElement).value;
  const istruzioni = (document.getElementById("istruzioni") as HTMLTextAreaElement).value;
  const tempoEsecuzione = (document.getElementById("tempoEsecuzione") as HTMLInputElement).value;
  const difficolta = (document.getElementById("difficolta") as HTMLInputElement).value;
  const immagine = (document.getElementById("immagine") as HTMLInputElement).value;

  const ricettaData = {
    nome: nomeRicetta.toLocaleLowerCase(),
    descrizione: descrizione,
    ingredienti: this.ingredienti,
    istruzioni: istruzioni,
    tempoEsecuzione: tempoEsecuzione,
    difficolta: difficolta,
    immagine: immagine
  };

  fetch('http://localhost:3000/ricette', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ricettaData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Ricetta salvata con successo:', data);
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error('Errore durante il salvataggio della ricetta:', error);
    });
}
}