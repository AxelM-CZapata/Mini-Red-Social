import { Inject, Injectable } from '@nestjs/common';
import { Publicacion } from './entity/publicaciones.entity';

@Injectable()
export class PublicacionesService {
  constructor(
    @Inject('PUBLICACIONES_REPOSITORY')
    private publicacionesProviders: typeof Publicacion,
  ) {}

  async findAll(): Promise<Publicacion[]> {
    return this.publicacionesProviders.findAll();
  }

  async create( { title, body } ): Promise<string> {
    const postData = {
      title,
      body,
      isActive: true,
    };

    this.publicacionesProviders.create(postData);
    return 'Publicacion creada correctamente';
  }

  async delete(id:string): Promise<string> {
    const publicacion = await this.publicacionesProviders.findByPk(parseInt(id));
    if (publicacion) {
      publicacion.isActive = false;
    }
    await publicacion.save();
    return 'Publicacion eliminada';
  }

  async update(id:string, { title, body }): Promise<string> {
    if (!body && !title ) return 'Nada que actualizar';
    const publicacion = await this.publicacionesProviders.findByPk(parseInt(id));
    if (publicacion) {
      if (title) publicacion.title = title;
      if (body) publicacion.body = body;
      await publicacion.save();
      return 'Actualizado';
    } else {
      return 'No existe la publicacion';
    }
  }
}
