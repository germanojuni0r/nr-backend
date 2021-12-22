import { CommandTypeEnum } from '../enums/CommandTypeEnum';
import { Injectable } from '@nestjs/common';
import { RunRobotCommandDTO } from '../dtos/RunRobotCommandDTO';
import { PositionEnum } from '../enums/PositionEnum';
import { HistoryDAO } from './daos/HistoryDAO';
import { HistoryModel } from '../models/HistoryModel';
import { RunRobotCommandReturnDTO } from '../dtos/RunRobotCommandReturnDTO';
import { ApiErrorCodeEnum } from '../../../../common/enums/ApiErrorCodeEnum';
import { IError } from '../../../../common/interfaces/IError';

/**
 * Service do robô. Onde as requisições são processadas.
 * @author Germano Junior
 */

@Injectable()
export class RobotService {
  constructor(private readonly _historyDAO: HistoryDAO) {}

  async runCommand(dto: RunRobotCommandDTO): Promise<RunRobotCommandReturnDTO> {
    let currentX = 0;
    let currentY = 0;
    let currentPos = PositionEnum.NORTH;

    const command = dto.command.toUpperCase();

    if (dto.command !== CommandTypeEnum.RESET) {
      currentX = dto.initialX;
      currentY = dto.initialY;
      currentPos = dto.initialPos;

      command.split('').forEach((currentCommand) => {
        if (!(<any>Object).values(CommandTypeEnum).includes(currentCommand)) {
          throw { code: ApiErrorCodeEnum.INVALID_INPUT } as IError;
        }

        if (currentCommand === CommandTypeEnum.MOVE) {
          if (currentPos === PositionEnum.NORTH) {
            currentY += 1;
          } else if (currentPos === PositionEnum.SOUTH) {
            currentY -= 1;
          } else if (currentPos === PositionEnum.EAST) {
            currentX += 1;
          } else if (currentPos === PositionEnum.WEST) {
            currentX -= 1;
          }

          if (currentX < 0 || currentY < 0 || currentX > 4 || currentY > 4) {
            throw { code: ApiErrorCodeEnum.OUT_OF_EDGE } as IError;
          }
        } else if (
          currentCommand === CommandTypeEnum.LEFT ||
          currentCommand === CommandTypeEnum.RIGHT
        ) {
          if (currentPos === PositionEnum.NORTH) {
            currentPos =
              currentCommand === CommandTypeEnum.LEFT
                ? PositionEnum.WEST
                : PositionEnum.EAST;
          } else if (currentPos === PositionEnum.SOUTH) {
            currentPos =
              currentCommand === CommandTypeEnum.LEFT
                ? PositionEnum.EAST
                : PositionEnum.WEST;
          } else if (currentPos === PositionEnum.EAST) {
            currentPos =
              currentCommand === CommandTypeEnum.LEFT
                ? PositionEnum.NORTH
                : PositionEnum.SOUTH;
          } else if (currentPos === PositionEnum.WEST) {
            currentPos =
              currentCommand === CommandTypeEnum.LEFT
                ? PositionEnum.SOUTH
                : PositionEnum.NORTH;
          }
        } else {
          throw { code: ApiErrorCodeEnum.INVALID_INPUT } as IError;
        }
      });
    }

    const newHistory = new HistoryModel();

    newHistory.initialX = dto.initialX;
    newHistory.initialY = dto.initialY;
    newHistory.initialPos = dto.initialPos;
    newHistory.command = dto.command;
    newHistory.finalX = currentX;
    newHistory.finalY = currentY;
    newHistory.finalPos = currentPos;

    await this._historyDAO.create(newHistory);

    const history = await this._historyDAO.find();

    return { currentX, currentY, currentPos, history };
  }
}
