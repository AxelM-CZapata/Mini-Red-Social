import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { publicacionesProviders } from './providers/publicaciones.provider';
import { PublicacionesController } from './publicaciones.controller';
import { imagenProviders } from './providers/imagenes.provider';

@Module({
  controllers: [PublicacionesController],
  providers: [
  PublicacionesService, 
  ...publicacionesProviders,
  ...imagenProviders
  ],
  })
export class PublicacionesModule {}
