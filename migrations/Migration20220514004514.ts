import { Migration } from '@mikro-orm/migrations';

export class Migration20220514004514 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "phone" varchar(255) not null, add column "resume" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "phone";');
    this.addSql('alter table "users" drop column "resume";');
  }

}
