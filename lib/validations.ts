import { z } from "zod"

export const SignupSchema = z.object({
    FullName:z.string().
    min(2,"fullname must be at list 2 character").
    max(50,"name is too long").nonempty("Name must not be Empty"),
    email:z.string().email("Enter a valid Email Address").
    max(100,"Email length is too long").nonempty("Email can't be empty"),
    password:z.string().min(8,"Password must be atlist 8 characters").nonempty()
})

export const SignInSchema = z.object({
    email:z.string().email("enter a valid email").max(100,"email to long"),
    password:z.string().min(8,"password must be atleast 2 characters").nonempty("password can't be empty")
})

export const PropertySchema = z.object({
  name: z.string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom est trop long"),
  
  price: z.number()
    .positive("Le prix doit être positif")
    .min(1, "Le prix est requis"),
  
  bedrooms: z.number()
    .int()
    .min(0, "Le nombre de chambres ne peut pas être négatif")
    .max(20, "Le nombre de chambres semble incorrect"),
  
  bathrooms: z.number()
    .int()
    .min(0, "Le nombre de salles de bain ne peut pas être négatif")
    .max(10, "Le nombre de salles de bain semble incorrect"),
  
  address: z.string()
    .min(5, "L'adresse est requise")
    .max(500, "L'adresse est trop longue"),
  
  latitude: z.number()
    .min(-90, "Latitude invalide")
    .max(90, "Latitude invalide"),
  
  longitude: z.number()
    .min(-180, "Longitude invalide")
    .max(180, "Longitude invalide"),
  
  rating: z.number()
    .min(1, "La note doit être entre 1 et 5")
    .max(5, "La note doit être entre 1 et 5"),
  
  type: z.enum([
    "Appartement",
    "Maison",
    "Studio",
    "Immeuble",
    "Duplex",
    "Penthouse"
  ] as const),
  
  features: z.array(z.string()),
  
  area: z.number()
    .positive("La surface doit être positive")
    .min(1, "La surface est requise"),
  
  images: z.array(z.string()),
  
  available: z.boolean()
})

export type PropertyFormData = z.infer<typeof PropertySchema>