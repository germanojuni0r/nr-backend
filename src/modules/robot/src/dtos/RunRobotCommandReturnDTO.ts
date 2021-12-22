/**
 * DTO
 * Dto de retorno da criação do comendo para o robô
 *
 * @author Germano Junior
 */

import { IsDefined, IsNumber, IsString } from 'class-validator';

import { HistoryModel } from '../models/HistoryModel';
import { PositionEnum } from '../enums/PositionEnum';

export class RunRobotCommandReturnDTO {
  constructor(
    currentX: number,
    currentY: number,
    currentPos: PositionEnum,
    history: HistoryModel[],
  ) {
    this.currentX = currentX;
    this.currentY = currentY;
    this.currentPos = currentPos;
    this.history = history;
  }

  @IsDefined()
  @IsNumber()
  currentX!: number;

  @IsDefined()
  @IsNumber()
  currentY!: number;

  @IsDefined()
  @IsString()
  currentPos!: PositionEnum;

  @IsDefined()
  history!: HistoryModel[];
}
