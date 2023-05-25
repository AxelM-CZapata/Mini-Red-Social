import { Publicacion } from './entity/publicaciones.entity';

export const publicacionesProviders = [
  {
    provide: 'PUBLICACIONES_REPOSITORY',
    useValue: Publicacion,
  },
];