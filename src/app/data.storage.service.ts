import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*------------------------------------
Devo mettere in app.module.ts

import { HttpClient, HttpClientModule } from "@angular/common/http";
.....
imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
------------------------------------*/
export class DataStorageService {
  private REST_API_SERVER = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) {}

   public sendGetRequest(endpoint: string){
    return this.httpClient.get(this.REST_API_SERVER+endpoint);
   }
   public sendPostRequest(endpoint: string, body: any){
    return this.httpClient.post(this.REST_API_SERVER+endpoint,body);
   }
   public sendPutRequest(endpoint: string, body: any){
    return this.httpClient.put(this.REST_API_SERVER+endpoint,body);
   }
   public sendDeleteRequest(endpoint: string){
    return this.httpClient.delete(this.REST_API_SERVER+endpoint);
   }
}