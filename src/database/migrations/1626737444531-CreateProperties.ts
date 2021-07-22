import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProperties1626737444531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'owner_id',
            type: 'uuid',
          },
          {
            name: 'bathrooms',
            type: 'int',
            default: 0,
          },
          {
            name: 'rooms',
            type: 'int',
            default: 0,
          },
          {
            name: 'bedrooms',
            type: 'int',
            default: 0,
          },
          {
            name: 'suites',
            type: 'int',
            default: 0,
          },
          {
            name: 'propertie_size',
            type: 'real',
            default: 0,
          },
          {
            name: 'terrain_size',
            type: 'real',
            default: 0,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'real',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'parking_spaces',
            type: 'int',
            default: 0,
          },
          {
            name: 'goal',
            type: 'varchar',
          },
          {
            name: 'photos',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
