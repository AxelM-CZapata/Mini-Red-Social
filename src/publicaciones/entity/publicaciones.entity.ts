import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Publicacion extends Model {
  @Column
    title:string;

  @Column
    body:string;

  @Column
    isActive: boolean ;

}