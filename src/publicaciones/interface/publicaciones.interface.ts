import { Imagen } from '../entity/imagen.entity';

export interface Publicaciones {
  id?:number;
  title:string;
  body:string;
  isActive:boolean;
  imagenes?: Imagen[];
}
