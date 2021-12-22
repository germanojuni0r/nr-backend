/**
 * DTO
 * Dto do criacao de novo comando para o robô
 *
 * @author Germano Junior
 */

import { IsDefined, IsNumber, IsString } from 'class-validator';

import { PositionEnum } from '../enums/PositionEnum';

export class RunRobotCommandDTO {
  constructor(
    command: string,
    initialX: number,
    initialY: number,
    initialPos: PositionEnum,
  ) {
    this.command = command;
    this.initialX = initialX;
    this.initialY = initialY;
    this.initialPos = initialPos;
  }

  @IsDefined()
  @IsString()
  command!: string;

  @IsDefined()
  @IsNumber()
  initialX!: number;

  @IsDefined()
  @IsNumber()
  initialY!: number;

  @IsDefined()
  @IsString()
  initialPos!: PositionEnum;
}
