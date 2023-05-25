import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { publicacionesProviders } from './publicaciones.provider';
import { PublicacionesController } from './publicaciones.controller';

@Module({
  controllers: [PublicacionesController],
  providers: [
  PublicacionesService, 
  ...publicacionesProviders
  ],
  })
export class PublicacionesModule {}
