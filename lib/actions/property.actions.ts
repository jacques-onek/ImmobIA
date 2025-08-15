"use server"

import { db } from "@/database/drizzle"
import { properties } from "@/database/schema"
import { PropertySchema, PropertyFormData } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { imagekit } from "@/lib/imagekit"

export async function createProperty(data: PropertyFormData) {
  try {
    const validatedData = PropertySchema.parse(data)
    
    const [newProperty] = await db.insert(properties).values({
      ...validatedData,
      price: validatedData.price.toString(),
      latitude: validatedData.latitude.toString(),
      longitude: validatedData.longitude.toString(),
      rating: validatedData.rating.toString(),
    }).returning()
    
    revalidatePath('/manager')
    revalidatePath('/estate')
    
    return { 
      success: true, 
      data: newProperty,
      message: "Propriété créée avec succès" 
    }
  } catch (error) {
    console.error("Error creating property:", error)
    return { 
      success: false, 
      error: "Erreur lors de la création de la propriété" 
    }
  }
}

export async function getImageKitAuth() {
  return imagekit.getAuthenticationParameters()
}