import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  people_count: number;

  @Column({ nullable: true })
  conv_time: number;

  @Column({ nullable: true })
  total_conv_time: number;
}

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo_url: string;

  @Column()
  name: string;
}
