import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room, Users } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Users])],

  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
