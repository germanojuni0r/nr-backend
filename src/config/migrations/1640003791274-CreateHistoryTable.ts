import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHistoryTable1640003791274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE nasarobot.history (
                id INT NOT NULL AUTO_INCREMENT,
                initial_x INT NOT NULL,
                initial_y INT NOT NULL,
                initial_pos VARCHAR(1) NOT NULL,
                command VARCHAR(255) NOT NULL,
                final_x INT NOT NULL,
                final_y INT NOT NULL,
                final_pos VARCHAR(1) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE nasarobot.history;`);
  }
}
