import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Usuarios } from './Usuarios.entity';

@Table
export class Amigos extends Model {
  @Column
    usersId: number;

  @Column
    friendId: number;

}
