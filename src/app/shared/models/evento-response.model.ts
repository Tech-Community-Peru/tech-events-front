import {CategoryEvent} from './categoryEvent.model';
import {TypeEvent} from './typeEvent.model';

export interface EventoResponse {

  id: number;

  nombre: string;

  costo: number;


  descripcion:  string;

  eventoCategoria:  CategoryEvent;

  tipoEvento:  TypeEvent;
}
