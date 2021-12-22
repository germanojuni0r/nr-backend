import {
  Body,
  Controller,
  OnApplicationBootstrap,
  Post,
  UseFilters,
} from '@nestjs/common';
import { RunRobotCommandDTO } from './dtos/RunRobotCommandDTO';
import { RunRobotCommandReturnDTO } from './dtos/RunRobotCommandReturnDTO';
import { IApiReturn } from '../../../common/interfaces/IApiReturn';

import { RobotService } from './services/RobotService';
import { RobotExceptionFilter } from './services/exceptions/RobotExceptionFilter';

/**
 * Controller do robô. Onde as requisições são tratadas.
 * @author Germano Junior
 */

@Controller('robot')
@UseFilters(RobotExceptionFilter)
export class RobotController implements OnApplicationBootstrap {
  constructor(private readonly _robotService: RobotService) {}

  onApplicationBootstrap() {
    console.log(`Robot module has been initialized.`);
  }

  @Post('run-command')
  async runCommand(
    @Body() dto: RunRobotCommandDTO,
  ): Promise<IApiReturn<RunRobotCommandReturnDTO>> {
    const data = await this._robotService.runCommand(dto);
    return { data };
  }
}
