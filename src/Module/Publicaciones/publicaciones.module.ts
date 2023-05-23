import { Module } from '@nestjs/common';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';
import { Publicaciones } from '../Schema/publicaciones.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Publicaciones])],
  controllers: [PublicacionesController],
  providers: [PublicacionesService]
})
export class PublicacionesModule { }