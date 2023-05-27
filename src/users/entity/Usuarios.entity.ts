import { Table, Column, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Amigos } from './Amigos.entity';
import { Publicaciones } from 'src/publicaciones/entity/publicaciones.entity';


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

  @BelongsToMany(()=> Usuarios, () => Amigos, 'userId', 'friendId')
    friends: Usuarios[];

  @HasMany(() => Publicaciones)
    post: Publicaciones[];
}