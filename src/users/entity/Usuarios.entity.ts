import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Usuarios extends Model {
  @Column
    name: string;

  @Column
    email: string;

  @Column
    age: number;

  @Column
    perfileImage: string;

  @Column
    password: string;

}