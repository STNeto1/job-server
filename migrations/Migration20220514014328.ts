import { Migration } from '@mikro-orm/migrations';

export class Migration20220514014328 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "companies" add column "deleted_at" timestamptz(0) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "companies" drop column "deleted_at";');
  }

}
