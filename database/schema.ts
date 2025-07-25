import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";









export const ROLE_ENUM = pgEnum("role",["ADMIN","USER","SELLER"])

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  FullName: varchar("full_name",{ length: 255 }),
  email: varchar("email",{ length: 255 }).notNull().unique(),
  password:varchar({length:255}).default(""),
  profileCover:text("profil_card"),
  role:ROLE_ENUM("role").default('USER'),
  providerId:text("provider_id"),
  created:timestamp("created_at").defaultNow()
});
