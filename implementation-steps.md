# Property Form Implementation - Step-by-Step Guide

## Step 1: Install Required Dependencies

```bash
npm install imagekit imagekit-react react-dropzone @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-textarea @radix-ui/react-switch lucide-react
```

## Step 2: Set Up Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
```

## Step 3: Create UI Components

### 3.1 Select Component (`components/ui/select.tsx`)
```typescript
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

### 3.2 Textarea Component (`components/ui/textarea.tsx`)
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

### 3.3 Checkbox Component (`components/ui/checkbox.tsx`)
```typescript
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

## Step 4: Create ImageKit Configuration

### 4.1 ImageKit Config (`lib/imagekit.ts`)
```typescript
import ImageKit from "imagekit"

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})
```

## Step 5: Update Validation Schema

### 5.1 Property Schema (`lib/validations.ts`)
Add this to your existing validations file:

```typescript
export const PropertySchema = z.object({
  name: z.string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom est trop long"),
  
  price: z.coerce.number()
    .positive("Le prix doit être positif")
    .min(1, "Le prix est requis"),
  
  bedrooms: z.coerce.number()
    .int()
    .min(0, "Le nombre de chambres ne peut pas être négatif")
    .max(20, "Le nombre de chambres semble incorrect"),
  
  bathrooms: z.coerce.number()
    .int()
    .min(0, "Le nombre de salles de bain ne peut pas être négatif")
    .max(10, "Le nombre de salles de bain semble incorrect"),
  
  address: z.string()
    .min(5, "L'adresse est requise")
    .max(500, "L'adresse est trop longue"),
  
  latitude: z.coerce.number()
    .min(-90, "Latitude invalide")
    .max(90, "Latitude invalide"),
  
  longitude: z.coerce.number()
    .min(-180, "Longitude invalide")
    .max(180, "Longitude invalide"),
  
  rating: z.coerce.number()
    .min(1, "La note doit être entre 1 et 5")
    .max(5, "La note doit être entre 1 et 5"),
  
  type: z.enum([
    "Appartement", 
    "Maison", 
    "Studio", 
    "Immeuble", 
    "Duplex", 
    "Penthouse"
  ]),
  
  features: z.array(z.string()).optional().default([]),
  
  area: z.coerce.number()
    .positive("La surface doit être positive")
    .min(1, "La surface est requise"),
  
  images: z.array(z.string())
    .min(1, "Au moins une image est requise")
    .max(10, "Maximum 10 images autorisées"),
  
  available: z.boolean().default(true)
})

export type PropertyFormData = z.infer<typeof PropertySchema>
```

## Step 6: Create Server Actions

### 6.1 Property Actions (`lib/actions/property.actions.ts`)
```typescript
"use server"

import { db } from "@/database/drizzle"
import { properties } from "@/database/schema"
import { PropertySchema } from "@/lib/validations"
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
```

## Step 7: Create Property Features Constants

### 7.1 Features List (`constant/propertyFeatures.ts`)
```typescript
export const PROPERTY_FEATURES = [
  { id: 'piscine', label: 'Piscine' },
  { id: 'balcon', label: 'Balcon' },
  { id: 'meuble', label: 'Meublé' },
  { id: 'climatisation', label: 'Climatisation' },
  { id: 'domotique', label: 'Domotique' },
  { id: 'generateur', label: 'Générateur' },
  { id: 'vue_fleuve', label: 'Vue sur le fleuve' },
  { id: 'vue_ville', label: 'Vue sur ville' },
  { id: 'terrasse', label: 'Terrasse' },
  { id: 'jardin', label: 'Jardin' },
  { id: 'salle_jeux', label: 'Salle de jeux' },
  { id: 'salle_sport', label: 'Salle de sport' },
  { id: 'buanderie', label: 'Buanderie' },
  { id: 'cuisine_exterieure', label: 'Cuisine extérieure' },
  { id: 'securite_24_7', label: 'Sécurité 24/7' },
  { id: 'internet_inclus', label: 'Internet inclus' },
  { id: 'ascenseur', label: 'Ascenseur' },
  { id: 'garage', label: 'Garage' },
]

export const PROPERTY_TYPES = [
  { value: 'Appartement', label: 'Appartement' },
  { value: 'Maison', label: 'Maison' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Immeuble', label: 'Immeuble' },
  { value: 'Duplex', label: 'Duplex' },
  { value: 'Penthouse', label: 'Penthouse' },
]
```

## Step 8: Create Image Upload Component

### 8.1 Image Upload Component (`components/property/ImageUpload.tsx`)
```typescript
"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { IKContext, IKUpload } from 'imagekit-react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onUploadSuccess = (res: any) => {
    const newImageUrl = res.url
    if (images.length < maxImages) {
      onImagesChange([...images, newImageUrl])
      toast.success('Image téléchargée avec succès')
    }
    setUploading(false)
  }

  const onUploadError = (err: any) => {
    console.error('Upload error:', err)
    toast.error('Erreur lors du téléchargement')
    setUploading(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file drop
    acceptedFiles.forEach(file => {
      // Process each file
      setUploading(true)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  })

  return (
    <div className="space-y-4">
      <IKContext
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        authenticator={async () => {
          const response = await fetch('/api/imagekit-auth')
          return await response.json()
        }}
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
            ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? "Déposez les images ici..."
              : `Glissez-déposez des images ou cliquez pour sélectionner`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {images.length}/{maxImages} images
          </p>
          
          <IKUpload
            fileName="property-image"
            folder="/properties"
            onSuccess={onUploadSuccess}
            onError={onUploadError}
            style={{ display: 'none' }}
            id="imagekit-upload"
          />
        </div>
      </IKContext>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Step 9: Create Main Property Form Component

### 9.1 Property Form (`components/property/PropertyForm.tsx`)
```typescript
"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { PropertySchema, PropertyFormData } from '@/lib/validations'
import { createProperty } from '@/lib/actions/property.actions'
import { PROPERTY_FEATURES, PROPERTY_TYPES } from '@/constant/propertyFeatures'
import { ImageUpload } from './ImageUpload'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PropertyForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      name: '',
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      address: '',
      latitude: 0,
      longitude: 0,
      rating: 3,
      type: 'Appartement',
      features: [],
      area: 0,
      images: [],
      available: true,
    }
  })

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createProperty(data)
      
      if (result.success) {
        toast.success(result.message)
        router.push('/manager')
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Informations de base */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
            <CardDescription>
              Détails principaux de votre propriété
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la propriété</FormLabel>
                  <FormControl>
                    <Input placeholder="Villa moderne..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de propriété</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface (m²)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="120" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section 2: Détails de la propriété */}
        <Card>
          <CardHeader>
            <CardTitle>Détails de la propriété</CardTitle>
            <CardDescription>
              Caractéristiques spécifiques
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chambres</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salles de bain</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Disponible
                    </FormLabel>
                    <FormDescription>
                      Cette propriété est actuellement disponible
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section 3: Localisation */}
        <Card>
          <CardHeader>
            <CardTitle>Localisation</CardTitle>
            <CardDescription>
              Adresse et coordonnées géographiques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse complète</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="123 Avenue de la Paix, Kinshasa..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.000001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.000001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Caractéristiques */}
        <Card>
          <CardHeader>
            <CardTitle>Caractéristiques</CardTitle>
            <CardDescription>
              Sélectionnez les équipements disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {PROPERTY_FEATURES.map((feature) => (
                      <FormField
                        key={feature.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={feature.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, feature.label