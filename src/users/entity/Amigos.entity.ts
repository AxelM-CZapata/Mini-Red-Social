import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Amigos extends Model {
  @Column
    userId: number;

  @Column
    friendId: number;
}
