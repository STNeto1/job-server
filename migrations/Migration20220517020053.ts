import { Migration } from '@mikro-orm/migrations';

export class Migration20220517020053 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "jobs" add column "slug" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "jobs" drop column "slug";');
  }

}
