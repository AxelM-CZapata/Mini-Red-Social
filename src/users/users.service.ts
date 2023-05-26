import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Usuarios } from './entity/Usuarios.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private serviceUsers: typeof Usuarios,
    private readonly configureService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.serviceUsers.create({ ...createUserDto });
    return newUser;
  }
  
  async findAll(): Promise<Usuarios[]> {
    const api = this.configureService.get('DB_HOST');
    console.log(api);
    return this.serviceUsers.findAll(api);
  }

  findOne(id: string): Promise<Usuarios> {
    return this.serviceUsers.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await usuario.destroy();
  }

}