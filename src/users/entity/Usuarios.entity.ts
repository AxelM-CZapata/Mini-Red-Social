import { Table, Column, Model, BelongsToMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Amigos } from './Amigos.entity';
import { UsuariosAmigos } from './UsuariosAmigos.entity';
// import { CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Table
export class Usuarios extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id: string;

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

  // // Excluir createdAt de las consultas
  // @CreateDateColumn({ select: false })
  //   createdAt: Date;

  // // Excluir updatedAt de las consultas
  // @UpdateDateColumn({ select: false })
  //   updatedAt: Date;

  @BelongsToMany(() => Usuarios, () => UsuariosAmigos, 'userId', 'friendId')
    friends: Amigos[];
}
