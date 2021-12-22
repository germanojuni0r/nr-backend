import { AppController } from './AppController';
import { AppService } from './AppService';
import { DBConfig } from 'src/config/DBConfig';
import { Module } from '@nestjs/common';
import { RobotModule } from '../robot/RobotModule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig.connectionOptions), RobotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
