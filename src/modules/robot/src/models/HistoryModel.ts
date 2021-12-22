import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * MODELO: HISTÓRICO
 *
 * @author Germano Junior
 */

@Entity('history')
export class HistoryModel {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id!: number;

  @Column({
    type: 'int',
    name: 'initial_x',
  })
  initialX!: number;

  @Column({
    type: 'int',
    name: 'initial_y',
  })
  initialY!: number;

  @Column({
    type: 'varchar',
    name: 'initial_pos',
  })
  initialPos!: string;

  @Column({
    type: 'varchar',
    name: 'command',
  })
  command!: string;

  @Column({
    type: 'int',
    name: 'final_x',
  })
  finalX!: number;

  @Column({
    type: 'int',
    name: 'final_y',
  })
  finalY!: number;

  @Column({
    type: 'varchar',
    name: 'final_pos',
  })
  finalPos!: string;

  @Column({
    type: 'varchar',
    name: 'created_at',
  })
  createdAt!: string;

  @Column({
    type: 'varchar',
    name: 'updated_at',
  })
  updatedAt!: string;

  @DeleteDateColumn({
    type: 'varchar',
    name: 'deleted_at',
  })
  deletedAt?: string;
}
