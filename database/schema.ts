import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";





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

export const estates = pgTable('estates',{
    id:uuid("id").defaultRandom().primaryKey().notNull().unique(),  
    PropertyName: varchar("Property_name",{length:500}),
    Price:integer("Property_price").notNull(), 
    Bedrooms:integer("Property_bedrooms"),
    Bathrooms:integer("Property_bathrooms"),
    Address:text("Property_address").notNull(),
    Rating:integer("Property_rating"), 
    Type: PROPERTY_TYPE_ENUM("type"),
    Features:text("Property_feature"), 
    Area:integer("Property_area"), 
    Image:text("Property_image") 

})
