import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publicaciones } from './Module/Schema/publicaciones.model';
import { config } from 'dotenv';
config()

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env

  @Module({
    imports: [
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        models: [Publicaciones],
        synchronize: true,
        autoLoadModels: true
      })
    ],
    controllers: [AppController],
    providers: [AppService],
  })

  export class AppModule { }
