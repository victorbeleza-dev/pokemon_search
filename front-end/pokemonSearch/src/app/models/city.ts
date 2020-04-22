import { Coord } from '../models/coord';
import { Weather } from '../models/weather';
import { CityDto } from '../models/dto/city-dto';
import { Wind } from '../models/wind';
import { Clouds } from '../models/clouds';
import { Sys } from '../models/sys';

export interface City {
  coord: Coord;
  weather: Weather;
  base: string;
  main: CityDto;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
