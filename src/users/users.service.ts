import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Usuarios } from './entity/Usuarios.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private serviviceUsers: typeof Usuarios,
    private readonly configureService: ConfigService,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    const api = this.configureService.get('DB_HOST');
    console.log(api);
    return this.serviviceUsers.findAll(api);
  }

  findOne(id: string): Promise<Usuarios> {
    return this.serviviceUsers.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await usuario.destroy();
  }
}