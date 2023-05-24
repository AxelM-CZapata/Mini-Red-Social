import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Publicaciones } from './Entity/publicaciones.entity';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicaciones)
    private publicacionModel: typeof Publicaciones,
  ) { }

  async findAll(): Promise<Publicaciones[]> {
    return this.publicacionModel.findAll();
  }

  findOne(id: string): Promise<Publicaciones> {
    return this.publicacionModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const publicacion = await this.findOne(id);
    await publicacion.destroy();
  }
}
