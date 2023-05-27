import { Sequelize } from 'sequelize-typescript';
import { Imagenes } from 'src/publicaciones/entity/imagen.entity';
import { Publicaciones } from 'src/publicaciones/entity/publicaciones.entity';
import { Amigos } from 'src/users/entity/Amigos.entity';
import { Usuarios } from 'src/users/entity/Usuarios.entity';

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
      sequelize.addModels([Publicaciones, Imagenes, Usuarios, Amigos]);
      await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];