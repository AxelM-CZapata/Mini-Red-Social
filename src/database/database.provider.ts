import { Sequelize } from 'sequelize-typescript';
import { Amigos } from 'src/users/entity/Amigos.entity';
import { Usuarios } from 'src/users/entity/Usuarios.entity';
import { UsuariosAmigos } from 'src/users/entity/UsuariosAmigos.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'miniredsocial',
      });
      sequelize.addModels([Usuarios, Amigos, UsuariosAmigos]);
      await sequelize.sync();
      return sequelize;
    },
  },
];