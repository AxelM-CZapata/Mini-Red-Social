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

  async findById(id: string): Promise<Usuarios> {
    const user = await this.serviceUsers.findByPk(parseInt(id));

    console.log(user);
    if (!user) {
      throw new Error('No hay con ese id');
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.serviceUsers.findByPk(parseInt(id));

    if (!user) {
      throw new Error(`User with ID '${id}' not found`);
    }

    await this.serviceUsers.destroy({ where: { id: parseInt(id) } });
  }

  async update(
    id: string,
    { name, email, age, perfileImage, password },
  ): Promise<string> {
    if (!name && !email && !age && !perfileImage && !password)
      return 'Nada que actualizar';
    const user = await this.serviceUsers.findByPk(parseInt(id));
    if (user) {
      if (name) user.name = name;
      if (email) user.email = email;
      if (age) user.age = age;
      if (perfileImage) user.perfileImage = perfileImage;
      if (password) user.password = password;
      await user.save();
      return 'Actualizado';
    } else {
      return 'No existe la publicacion';
    }
  }
}