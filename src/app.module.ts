import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publicaciones } from './Module/Publicaciones/Schema/publicaciones.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Synystergates666',
      database: 'miniredsocial',
      models: [Publicaciones],
      synchronize: true,
      autoLoadModels: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
