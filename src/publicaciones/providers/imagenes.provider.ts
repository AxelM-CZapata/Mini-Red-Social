import { Imagenes } from '../entity/imagen.entity';

export const imagenProviders = [
  {
    provide: 'IMAGENES_REPOSITORY',
    useValue: Imagenes,
  },
];