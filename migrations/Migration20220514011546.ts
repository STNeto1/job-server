import { Migration } from '@mikro-orm/migrations';

export class Migration20220514011546 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "companies" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "logo" varchar(255) null, "type" smallint not null, "size" smallint not null, "description" text not null, "city" varchar(255) not null, "state" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "companies" add constraint "companies_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "companies" cascade;');
  }

}
