import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { City } from '../models/city';
import { Pokemon } from '../models/pokemon';
import { PokemonDetails } from '../models/pokemon-details';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  getTimeCity(city: string): Observable<City>{
    return this.httpClient.get<City>(this.url + '/' + city)
      .pipe(
        retry(2)
      )
  }

  getPokemon(type: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.url + '/pokemon/' + type)
      .pipe(
        retry(2)
      )
  }

  getPokemonDetail(pokemon: string): Observable<PokemonDetails> {
    return this.httpClient.get<PokemonDetails>(pokemon)
      .pipe(
        retry(2)
      )
  }
}
