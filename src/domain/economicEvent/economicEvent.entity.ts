import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Index(['eventDateTime', 'country'])
export class EconomicEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  @Index()
  eventDateTime: Date;

  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  })
  importance: string;

  @Column()
  event: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actualValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  forecastValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previousValue: number;

  @Column({ nullable: true })
  unit: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
