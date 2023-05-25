import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePostDto } from './dto/create-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor( private readonly publicacionesService: PublicacionesService) {}

  @Get()
  async getall() {
    return this.publicacionesService.findAll();
  }

  @Post()
  async post(@Body() body: CreatePostDto ) {
    return this.publicacionesService.create(body);
  }

  @Put('update/:id') // actualizar publicacion (recibe un id y body)
  async updatePost(@Param('id') id:string, @Body() body: CreatePostDto) {
    return this.publicacionesService.update(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.publicacionesService.delete(id);
  }
}
