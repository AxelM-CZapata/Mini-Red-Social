import { Imagenes } from '../entity/imagen.entity';

export interface Publicaciones {
  id?:number;
  title:string;
  body:string;
  isActive:boolean;
  imagenes?: Imagenes[];
}
