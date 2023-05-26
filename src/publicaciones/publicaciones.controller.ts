import { Body, Controller, UseInterceptors, UploadedFiles, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PublicacionesService } from './publicaciones.service';
import { CreatePostDto } from './dto/create-publicacion.dto';
import { diskStorage } from 'multer';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  @Get()
  async getall() {
    return this.publicacionesService.findAll();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('imagenes', undefined, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
        },
        }),
      }),
  )
  async post(@Body() body: CreatePostDto, @UploadedFiles() imagenes: Express.Multer.File[]) {
    return this.publicacionesService.create(body, imagenes);
  }

  @Put('update/:id') // actualizar publicacion (recibe un id y body)
  async updatePost(@Param('id') id: string, @Body() body: CreatePostDto) {
    return this.publicacionesService.update(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.publicacionesService.delete(id);
  }
}
