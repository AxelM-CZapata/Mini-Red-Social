import { Column, ForeignKey, Model, Table, BelongsTo, DataType } from 'sequelize-typescript';
import { Publicaciones } from './publicaciones.entity';

@Table({ timestamps: false })
export class Imagenes extends Model<Imagenes> {
  @Column
    url: string;

  @ForeignKey(() => Publicaciones)
  @Column
    publicacionId: number;

  @BelongsTo(() => Publicaciones)
    publicacion: Publicaciones;
}