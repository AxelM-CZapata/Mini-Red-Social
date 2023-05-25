import { Sequelize } from 'sequelize-typescript';
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
      sequelize.addModels([Usuarios]);
      await sequelize.sync();
      return sequelize;
    },
  },
];