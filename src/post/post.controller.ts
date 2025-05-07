import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { SearchPostDto } from './dto/searchg-post.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User } from '../decorators/user.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@User() userId: number, @Body() createPostDto: CreatePostDto, @UploadedFile() file) {
    const imageName = file ? file.originalname : null
    const post = {
      imageName,
      ...createPostDto,
    }
    return this.postService.create(post, userId)
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../frontend/public/upload',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname)
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return file.filename
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@User() userId: number, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@User() userId: number, @Param('id') id: string) {
    return this.postService.remove(+id, userId)
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get('/popular')
  getPopularPosts() {
    return this.postService.popular()
  }

  @Get('/search')
  searchPosts(@Query() dto: SearchPostDto) {
    return this.postService.search(dto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id)
  }
}
