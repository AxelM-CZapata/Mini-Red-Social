import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Usuarios } from './entity/Usuarios.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Publicaciones } from 'src/publicaciones/entity/publicaciones.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersService: typeof Usuarios,
    private readonly configureService: ConfigService,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    const api = this.configureService.get('DB_HOST');
    console.log(api);
    return this.usersService.findAll( {
      include: [Publicaciones], // Incluye la relación con la tabla de publicaciones
    });
  }

  findOne(id: string): Promise<Usuarios> {
    return this.usersService.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await usuario.destroy();
  }

  async post(body: CreateUserDto): Promise<string> {
    await this.usersService.create({ ...body });
    return 'Se ha creado correctamente';
  }
}