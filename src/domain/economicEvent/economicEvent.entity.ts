import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['time', 'name'], { unique: true })
export class EconomicEvent {
  @ApiProperty({ description: '고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '이벤트 시간' })
  @Column({ type: 'timestamp' })
  @Index()
  time: Date;

  @ApiProperty({ description: '이벤트 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '국가 코드' })
  @Column()
  country: string;

  @ApiProperty({
    description: '영향도',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  impact: string;

  @ApiProperty({ description: '실제 값', nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  actual: number;

  @ApiProperty({ description: '예상 값', nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimate: number;

  @ApiProperty({ description: '이전 값', nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previous: number;

  @ApiProperty({ description: '단위', nullable: true })
  @Column({ nullable: true })
  unit: string;

  @ApiProperty({ description: '생성 시간' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정 시간' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '삭제 시간', nullable: true })
  @DeleteDateColumn()
  deletedAt: Date | null;
}
