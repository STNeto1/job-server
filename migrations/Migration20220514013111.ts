import { Migration } from '@mikro-orm/migrations';

export class Migration20220514013111 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "companies" drop column "size";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "companies" add column "size" smallint not null;');
  }

}
