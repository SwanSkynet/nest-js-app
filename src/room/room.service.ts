import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Room, Users } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async updatePeopleCount(roomDto: RoomDto) {
    if (!roomDto?.people_count) {
      throw new NotAcceptableException();
    }

    let room = await this.roomRepository.findOneBy({ id: 1 });
    if (!room) {
      let room = await this.roomRepository.create(roomDto);
      await this.roomRepository.save(room);
    } else {
      room.people_count = roomDto.people_count;
      await this.roomRepository.save(room);
    }
    await this.fetchPeopleList(roomDto.people_count);
    return await this.calculateTotalTime();
  }

  async updateIntroTime(roomDto: RoomDto) {
    if (!roomDto?.conv_time) {
      throw new NotAcceptableException();
    }

    let room = await this.roomRepository.findOneBy({ id: 1 });
    if (!room) {
      let room = await this.roomRepository.create(roomDto);
      await this.roomRepository.save(room);
    } else {
      room.conv_time = roomDto.conv_time;
      await this.roomRepository.save(room);
    }

    return await this.calculateTotalTime();
  }

  async getPeoplesList() {
    const users = await this.userRepository.find();
    console.log(users);
    return {users};
  }

  async getTotalIntroTime() {
    const room = await this.roomRepository.findOneBy({ id: 1 });
    return room?.total_conv_time;
  }

  async fetchPeopleList(count: number) {
    await this.userRepository.clear();
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();

    let users: any = [];

    data.results.forEach((element) => {
      users.push({
        name: element?.name,
        photo_url: element?.picture?.large,
      });
    });

    console.log(users);

    users = await this.userRepository.create(users);
    return await this.userRepository.save(users);
  }

  async calculateTotalTime() {
    let room = await this.roomRepository.findOneBy({ id: 1 });
    if (room?.conv_time && room.people_count) {
      if (room.people_count % 2 == 1) {
        room.total_conv_time = room.people_count * room.conv_time;
      } else {
        room.total_conv_time = (room.people_count - 1) * room.conv_time;
      }

      return await this.roomRepository.save(room);
    }
    return room;
  }
}
