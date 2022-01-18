import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { Streamer } from './entities/streamer.entity';
import { StreamerService } from './streamer.service';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  index(): Promise<Streamer[]> {
    return this.streamerService.findAll();
  }

  @Post('create')
  create(@Body() data: CreateStreamerDto): Promise<Streamer> {
    return this.streamerService.create(data);
  }

  @Put(':id/update')
  update(@Param('id') id, @Body() data: UpdateStreamerDto): Promise<Streamer> {
    return this.streamerService.update(id, data);
  }

  @Delete(':id/delete')
  delete(@Param('id') id): Promise<any> {
    return this.streamerService.delete(id);
  }
}
