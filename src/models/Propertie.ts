import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('properties')
class Propertie {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  owner_id: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  bathrooms: number;

  @Column()
  rooms: number;

  @Column()
  bedrooms: number;

  @Column()
  suites: number;

  @Column()
  propertie_size: number;

  @Column()
  terrain_size: number;

  @Column()
  type: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  parking_spaces: number;

  @Column()
  goal: string;

  @Column('varchar', { array: true })
  photos: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setDefaultPhotos(): Promise<void> {
    this.photos = [];
  }
}

export default Propertie;
