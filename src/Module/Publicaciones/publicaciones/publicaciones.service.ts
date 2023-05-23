import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Publicaciones } from '../Schema/publicaciones.model';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicaciones)
        private PublicacionModel: typeof Publicaciones,
    ) { }

    async findAll(): Promise<Publicaciones[]> {
        return this.PublicacionModel.findAll();
    }

    findOne(id: string): Promise<Publicaciones> {
        return this.PublicacionModel.findOne({
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
