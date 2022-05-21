import { Migration } from '@mikro-orm/migrations'

export class Migration20220521132000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "job_applications" ("id" serial primary key, "user_id" int not null, "job_id" int not null, "status" int not null default 0, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    )

    this.addSql(
      'alter table "job_applications" add constraint "job_applications_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "job_applications" add constraint "job_applications_job_id_foreign" foreign key ("job_id") references "jobs" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "job_applications" cascade;')
  }
}
