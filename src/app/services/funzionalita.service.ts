// funzionalita.service.ts

import { Injectable } from '@angular/core';
import { Ricetta } from '../interface/Ricetta.module';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FunzionalitaService {
  private apiUrl = 'http://localhost:3000/ricette';
  public homepage :boolean = true;

  constructor() {

  }

  getRicette() {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Errore durante il recupero delle ricette', error);
        throw error;
      });
  }
  private _searchResults = new BehaviorSubject<Ricetta[]>([]);
  get searchResults() {
    return this._searchResults.asObservable();
  }

  updateSearchResults(ricette: Ricetta[]) {
    this._searchResults.next(ricette);
  }
  searchRicetta(valore: string): Promise<Ricetta[]> {
    const lowerCaseValore = valore.toLowerCase();
    console.log('valore in input:', valore);
    return fetch(this.apiUrl)
      .then(response => response.json())
      .then((searchResults: Ricetta[]) => {
        return searchResults.filter(searchResults => 
          searchResults.nome.toLowerCase().includes(lowerCaseValore) || 
          (searchResults.ingredienti && searchResults.ingredienti.some(ingrediente => ingrediente.ingrediente.toLowerCase().includes(lowerCaseValore)))
        );
      })
      .catch(error => {
        console.error('Errore durante la ricerca delle ricette', error);
        throw error;
      });
  }
  
  


  deleteRicetta(id: number): Promise<void> {
    return fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        console.log('Ricetta rimossa con successo da JSON Server');
      })
      .catch(error => {
        console.error('Errore durante la rimozione della ricetta', error);
        throw error;
      });
  }

  updateRicetta(id: number, ricettaData: any): Promise<Ricetta> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ricettaData),
    })
      .then(response => response.json())
      .then((ricetta: Ricetta) => {
        console.log('Ricetta modificata con successo da JSON Server', ricetta);
        return ricetta;
      })
      .catch(error => {
        console.error('Errore durante la modifica della ricetta', error);
        throw error;
      });
  }

  getRicettaById(id: number): Promise<Ricetta> {
    return fetch(`${this.apiUrl}/${id}`)
      .then(response => {
        if (!response.ok) {
          
          throw new Error(`Errore durante la richiesta: ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Errore durante il recupero della ricetta', error);
        throw error;
      });
  }
}
