import { Migration } from '@mikro-orm/migrations'

export class Migration20220517012825 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "jobs" ("id" serial primary key, "company_id" int not null, "title" varchar(255) not null, "regiment" int not null, "remote" boolean not null, "level" int not null, "salary" varchar(255) not null, "description" text not null, "requisites" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);'
    )

    this.addSql(
      'alter table "jobs" add constraint "jobs_company_id_foreign" foreign key ("company_id") references "companies" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "jobs" cascade;')
  }
}
