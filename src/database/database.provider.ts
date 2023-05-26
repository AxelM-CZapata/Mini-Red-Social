import { Sequelize } from 'sequelize-typescript';
import { Imagen } from 'src/publicaciones/entity/imagen.entity';
import { Publicacion } from 'src/publicaciones/entity/publicaciones.entity';
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
      sequelize.addModels([Publicacion, Imagen, Usuarios]);
      await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];