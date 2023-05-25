import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Amigos extends Model {
  @Column
    usuarioId: string;

}
