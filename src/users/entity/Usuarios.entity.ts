import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Amigos } from './Amigos.entity';
import { UsuariosAmigos } from './UsuariosAmigos.entity';

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

  @BelongsToMany(() => Usuarios, () => UsuariosAmigos, 'userId', 'friendId')
    friends: Amigos[];


}