import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsToPropertiesTable1626919237218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('properties', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'number',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('properties', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'number',
        type: 'varchar',
      }),
    ]);
  }
}
