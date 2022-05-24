import { Migration } from '@mikro-orm/migrations'

export class Migration20220524154946 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "job_application_messages" ("id" serial primary key, "application_id" int not null, "message" text not null, "from_user" boolean not null, "created_at" timestamptz(0) not null);'
    )

    this.addSql(
      'alter table "job_application_messages" add constraint "job_application_messages_application_id_foreign" foreign key ("application_id") references "job_applications" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "job_application_messages" cascade;')
  }
}
