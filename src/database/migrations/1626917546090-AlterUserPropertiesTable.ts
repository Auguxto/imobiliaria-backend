import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterUserPropertiesTable1626917546090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        name: 'PropertieOwner',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('properties', 'PropertieOwner');
  }
}
