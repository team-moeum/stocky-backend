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
@Index(['time', 'name'], { unique: true })
export class EconomicEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  @Index()
  time: Date;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  impact: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actual: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previous: number;

  @Column({ nullable: true })
  unit: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
