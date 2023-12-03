export interface Ricetta {
    id: number;
    nome: string;
    descrizione: string;
    ingredienti: { ingrediente: string; quantita: string }[];
    istruzioni: string;
    difficolta: string;
    tempoEsecuzione: string;
    immagine: string;
  }