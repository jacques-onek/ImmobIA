import { sql } from "drizzle-orm";
import { boolean, integer, numeric, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";





export const ROLE_ENUM = pgEnum("role",["ADMIN","USER","SELLER"])
export const PROPERTY_TYPE_ENUM = pgEnum("type",["Appartement", "Maison", "Studio" ,"Immeuble" , "Duplex", "Penthouse"])

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

export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  address: text("address").notNull(),

  // Ajout pour la géolocalisation
  latitude: numeric("latitude", { precision: 9, scale: 6 }).notNull(),   // Ex: -1.957875
  longitude: numeric("longitude", { precision: 9, scale: 6 }).notNull(), // Ex: 30.091722

  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  features: text("features").array().notNull(),
  area: integer("area").notNull(),
  images: text("images").array().notNull(),
  listedAt: timestamp("listed_at", { mode: "string" }).default(sql`now()`),
  available: boolean("available").default(true).notNull(),
});

