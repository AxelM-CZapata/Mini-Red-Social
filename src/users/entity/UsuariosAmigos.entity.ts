import { Table, Column, PrimaryKey, AutoIncrement, Model } from 'sequelize-typescript';

@Table
export class UsuariosAmigos extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column
    userId: number;

  @Column
    friendId: number;
}
