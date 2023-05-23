import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Publicaciones extends Model<Publicaciones> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    title: string;

    @Column
    body: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}