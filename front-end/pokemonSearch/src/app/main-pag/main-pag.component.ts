import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from '../models/city';
import { InformationDialog } from '../models/information-dialog';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { DialogPokemonComponent } from './dialog/dialog-pokemon/dialog-pokemon.component';

@Component({
  selector: 'main-pag',
  templateUrl: './main-pag.component.html',
  styleUrls: ['./main-pag.component.scss']
})
export class MainPagComponent implements OnInit {

  city: '';
  pokemon: Pokemon;
  informationCity: City;
  urlImagePokemon: '';
  informatioToDialog = {} as InformationDialog;

  constructor(private pokemonService: PokemonService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickConfirm() {
    this._snackBar.open('Procurando pokémons!', 'Fechar', {
      duration: 2000,
    });
    
    this.pokemonService.getTimeCity(this.city).subscribe((city: City) => {
      this.informationCity = city;
      this.searchPokemon(this.informationCity.main.temp);
    });
  }

  onSearchChange(value) {
    this.city = value;
  }

  searchPokemon(temp: number) {
    let typePokemon = '';
    if (this.informationCity.weather[0].main == "Rain") {
      typePokemon = 'electric';
    } else if (temp < 5) {
      typePokemon = 'ice'
    } else if (temp >= 5 && temp < 10) {
      typePokemon = 'water'
    } else if (temp >= 12 && temp < 15) {
      typePokemon = 'grass'
    } else if (temp >= 15 && temp < 21) {
      typePokemon = 'ground'
    } else if (temp >= 23 && temp < 27) {
      typePokemon = 'bug'
    } else if (temp >= 27 && temp < 33) {
      typePokemon = 'rock'
    } else if (temp > 33) {
      typePokemon = 'fire'
    } else {
      typePokemon = 'normal'
    }

    this.pokemonService.getPokemon(typePokemon).subscribe((pokemon: Pokemon) => {
      this.pokemon = pokemon;
      this.searchDetailsPokemon(this.pokemon.pokemon.url);
    })
  }

  searchDetailsPokemon(url: string) {
    this.pokemonService.getPokemonDetail(url).subscribe((pokemonDetail: any) => {
      this.urlImagePokemon = pokemonDetail.sprites.front_default;
      this.openDialog(this.urlImagePokemon);
    })
  }

  openDialog(url: string) {
    console.log(this.urlImagePokemon)
    if (this.urlImagePokemon != null) {
      this.informatioToDialog.urlImage = url;
    } else {
      this.informatioToDialog.urlImage = '';
    }
    this.informatioToDialog.nomeCidade = this.informationCity.name;
    this.informatioToDialog.nomePokemon = this.pokemon.pokemon.name;
    this.informatioToDialog.temperatura = this.informationCity.main.temp;

    if (this.informationCity.weather[0].main == 'Rain') {
      this.informatioToDialog.estaChovendo = true;
    } else {
      this.informatioToDialog.estaChovendo = false;
    }

    const dialogRef = this.dialog.open(DialogPokemonComponent, {
      width: '600px',
      height: '800px',
      data: this.informatioToDialog
    });
  }
}
