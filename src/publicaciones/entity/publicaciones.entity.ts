import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Imagen } from './imagen.entity';

@Table
export class Publicacion extends Model {
  @Column
    title:string;

  @Column
    body:string;

  @Column
    isActive: boolean ;

  @HasMany(() => Imagen)
    imagenes: Imagen[];
}
