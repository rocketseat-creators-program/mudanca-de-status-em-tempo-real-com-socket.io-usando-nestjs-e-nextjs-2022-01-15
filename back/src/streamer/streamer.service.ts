import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { Streamer } from './entities/streamer.entity';
import { StreamerGateway } from './streamer.gateway';

@Injectable()
export class StreamerService {
  constructor(
    @InjectRepository(Streamer)
    private streamerRepository: Repository<Streamer>,
    private streamerGateway: StreamerGateway,
  ) {}

  async create(data: CreateStreamerDto): Promise<Streamer> {
    return await this.streamerRepository.save(data);
  }

  async findAll(): Promise<Streamer[]> {
    return await this.streamerRepository.find();
  }

  async update(id: number, data: UpdateStreamerDto): Promise<Streamer> {
    const streamer = await this.streamerRepository.findOne({ where: { id } });

    const updated = await this.streamerRepository.save({
      ...streamer,
      ...data,
    });

    if (streamer.status !== updated.status) {
      this.streamerGateway.handleStatus({
        room: updated.key,
        status: updated.status,
      });
    }

    return updated;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.streamerRepository.delete(id);
  }
}
