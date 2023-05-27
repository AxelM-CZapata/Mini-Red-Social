import { Table, Column, Model, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Imagenes } from './imagen.entity';
import { Usuarios } from 'src/users/entity/Usuarios.entity';

@Table
export class Publicaciones extends Model {
  @Column
    title:string;

  @ForeignKey(() => Usuarios)
  @Column
    userId: number;

  @BelongsTo(() => Usuarios)
    user: Usuarios;

  @Column
    body:string;

  @Column
    isActive: boolean ;

  @HasMany(() => Imagenes)
    imagenes: Imagenes[];

}
