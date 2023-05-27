import { Inject, Injectable } from '@nestjs/common';
import { Publicaciones } from './entity/publicaciones.entity';
import { Imagenes } from './entity/imagen.entity';
import { CreatePostDto } from './dto/create-publicacion.dto';
import * as path from 'path';

@Injectable()
export class PublicacionesService {
  constructor(
    @Inject('PUBLICACIONES_REPOSITORY')  // Inyectamos los providers de publicaciones
    private publicacionesProviders: typeof Publicaciones,
    @Inject('IMAGENES_REPOSITORY')  // Inyectamos los providers de imagenes
    private imagenesProviders: typeof Imagenes,
  ) { }

  async findAll(): Promise<Publicaciones[]> {  //funcion para retornar todoas las publicaciones
    const publicaciones = await this.publicacionesProviders.findAll({
      include: [Imagenes], // Incluye la relación con la tabla de imágenes
    });

    const flatImagenes = [];
    for (const publicacion of publicaciones) {
      const { id, title, body, imagenes, isActive, createdAt, updatedAt } = publicacion;
      flatImagenes.push({ id, title, body, createdAt, updatedAt, isActive, imagenes: imagenes.map((i) => i.url) });
    }

    return flatImagenes;
  }

  async create(body: CreatePostDto, imagenes: Express.Multer.File[]): Promise<string> {
    const post = await this.publicacionesProviders.create({ ...body, isActive: true });
    const publicacion = await this.publicacionesProviders.findByPk(post.id);
    const rutaCompleta = path.resolve('uploads');
    if (publicacion) {
      if (imagenes) {
        const imagenesPromises = imagenes.map(async (imagen) => {
          await this.imagenesProviders.create({
            url: rutaCompleta + '\\' + imagen.filename,
            publicacionId: publicacion.id,
          });
        });
        await Promise.all(imagenesPromises);
      }
    }
    return 'Publicaciones creada correctamente';
  }

  async delete(id: string): Promise<string> {
    const publicacion = await this.publicacionesProviders.findByPk(parseInt(id));
    if (publicacion) {
      publicacion.isActive = false;
    }
    await publicacion.save();
    return 'Publicaciones eliminada';
  }

  async update(id: string, { title, body }): Promise<string> {
    if (!body && !title) return 'Nada que actualizar';
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
