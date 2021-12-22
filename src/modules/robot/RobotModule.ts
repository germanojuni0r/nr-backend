import { HistoryDAO } from './src/services/daos/HistoryDAO';
import { HistoryModel } from './src/models/HistoryModel';
import { Module } from '@nestjs/common';
import { RobotController } from './src/RobotController';
import { RobotService } from './src/services/RobotService';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Modulo do robô.
 * @author Germano Junior
 */

@Module({
  imports: [TypeOrmModule.forFeature([HistoryModel])],
  controllers: [RobotController],
  providers: [RobotService, HistoryDAO],
})
export class RobotModule {}
