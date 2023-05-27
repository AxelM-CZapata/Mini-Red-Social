export class CreatePostDto {
  id?: number;

  title: string;

  body: string;

  userId: number;

  isActive?: boolean;

  imagenes?: string[];
}