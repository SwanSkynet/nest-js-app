import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('people')
  updatePeopleCount(@Body() roomDto: RoomDto) {
    return this.roomService.updatePeopleCount(roomDto);
  }

  @Post('intro-time')
  updateIntroTime(@Body() roomDto: RoomDto) {
    return this.roomService.updateIntroTime(roomDto);
  }

  @Get('total-intro-time')
  getTotalIntroTime() {
    return this.roomService.getTotalIntroTime();
  }

  @Get('people-list')
  getPeoplesList() {
    return this.roomService.getPeoplesList();
  }
  
}
