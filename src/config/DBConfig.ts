import { HistoryModel } from 'src/modules/robot/src/models/HistoryModel';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SystemProperties } from './SystemProperties';

/**
 * CONFIG
 * Encapsula logica de configuracao para BANCO DE DADOS da api.
 *
 * @author Germano Junior
 */
export class DBConfig {
  public static readonly connectionOptions: MysqlConnectionOptions = {
    type: 'mysql',
    host: SystemProperties.dbHost(),
    port: SystemProperties?.dbPort(),
    username: SystemProperties.dbUser(),
    password: SystemProperties.dbPassword(),
    database: SystemProperties.dbName(),
    entities: [HistoryModel],
    logging: false,
    migrations: ['**/config/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/config/migrations',
    },
  };
}
