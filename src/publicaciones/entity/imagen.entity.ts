import { Column, ForeignKey, Model, Table, BelongsTo, DataType } from 'sequelize-typescript';
import { Publicacion } from './publicaciones.entity';

@Table({ timestamps: false })
export class Imagen extends Model<Imagen> {
  @Column
    url: string;

  @ForeignKey(() => Publicacion)
  @Column
    publicacionId: number;

  @BelongsTo(() => Publicacion)
    publicacion: Publicacion;
}