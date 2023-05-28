import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usuariosProviders } from './Users.provider';

@Module({
  providers: [UsersService, ...usuariosProviders],
  controllers: [UsersController],
  })
export class UsersModule {}