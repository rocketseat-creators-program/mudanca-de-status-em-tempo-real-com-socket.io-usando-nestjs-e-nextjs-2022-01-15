import { Module } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import { StreamerGateway } from './streamer.gateway';
import { StreamerController } from './streamer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './entities/streamer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  providers: [StreamerGateway, StreamerService],
  controllers: [StreamerController],
})
export class StreamerModule {}
