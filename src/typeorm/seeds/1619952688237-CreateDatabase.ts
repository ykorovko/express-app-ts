import { MigrationInterface, QueryRunner } from 'typeorm'

import configSeed from '../config/ormconfig-seed'

export class CreateDatabase1619952688237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(configSeed.database as string, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(configSeed.database as string)
  }
}
