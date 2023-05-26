import { Inject, Injectable } from '@nestjs/common';
import { Publicacion } from './entity/publicaciones.entity';
import { Imagen } from './entity/imagen.entity';
import { CreatePostDto } from './dto/create-publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @Inject('PUBLICACIONES_REPOSITORY')
    private publicacionesProviders: typeof Publicacion,
    @Inject('IMAGENES_REPOSITORY')
    private imagenesProviders: typeof Imagen,
  ) { }

  async findAll(): Promise<Publicacion[]> {
    const publicaciones = await this.publicacionesProviders.findAll({
      include: [Imagen], // Incluye la relación con la tabla de imágenes
    });
    
    const flatImagenes = [];
    for (const publicacion of publicaciones) {
      const { id, title, body, imagenes, createdAt, updatedAt } = publicacion;
      flatImagenes.push({ id, title, body, createdAt, updatedAt, imagenes: imagenes.map((i) => i.url) });
    }

    return flatImagenes;
  }

  async create(body: CreatePostDto, imagenes: Express.Multer.File[]): Promise<string> {
    const post = await this.publicacionesProviders.create({ ...body, isActive: true });
    const publicacion = await this.publicacionesProviders.findByPk(post.id);
    if (publicacion) {
      if (imagenes) {
        const imagenesPromises = imagenes.map(async (imagen) => {
          await this.imagenesProviders.create({
            url: imagen.filename,
            publicacionId: publicacion.id,
          });
        });
        await Promise.all(imagenesPromises);
      }
    }
    return 'Publicacion creada correctamente';
  }

  async delete(id: string): Promise<string> {
    const publicacion = await this.publicacionesProviders.findByPk(parseInt(id));
    if (publicacion) {
      publicacion.isActive = false;
    }
    await publicacion.save();
    return 'Publicacion eliminada';
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
