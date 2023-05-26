import { Usuarios } from '../entity/Usuarios.entity';

export const usuariosProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Usuarios,
  },
];