# Property Form Implementation - Complete Code Guide

## Complete PropertyForm Component

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
import { Loader2 } from "lucide-react"

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
                                      ? field.onChange([...field.value, feature.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== feature.label
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {feature.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Section 5: Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
              Ajoutez jusqu'à 10 photos de votre propriété
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      images={field.value}
                      onImagesChange={field.onChange}
                      maxImages={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              'Créer la propriété'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

## API Route for ImageKit Authentication

Create `app/api/imagekit-auth/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { imagekit } from '@/lib/imagekit'

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    return NextResponse.json(authenticationParameters)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate auth parameters' },
      { status: 500 }
    )
  }
}
```

## Update Property Creation Page

Update `app/manager/create/property/page.tsx`:

```typescript
import React from 'react'
import { PropertyForm } from '@/components/property/PropertyForm'

export default function CreatePropertyPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Créer une nouvelle propriété</h1>
        <p className="text-gray-600 mt-2">
          Remplissez le formulaire ci-dessous pour ajouter une nouvelle propriété
        </p>
      </div>
      
      <PropertyForm />
    </div>
  )
}
```

## Alternative: Simple Image Upload without ImageKit SDK

If you prefer a simpler approach without the ImageKit React SDK:

```typescript
"use client"

import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload } from 'lucide-react'
import { toast } from 'sonner'

interface SimpleImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function SimpleImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10 
}: SimpleImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const uploadToImageKit = async (file: File) => {
    try {
      // Get auth parameters from your API
      const authResponse = await fetch('/api/imagekit-auth')
      const { token, expire, signature } = await authResponse.json()

      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', file.name)
      formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!)
      formData.append('signature', signature)
      formData.append('expire', expire)
      formData.append('token', token)
      formData.append('folder', '/properties')

      // Upload to ImageKit
      const uploadResponse = await fetch(
        'https://upload.imagekit.io/api/v1/files/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!uploadResponse.ok) {
        throw new Error('Upload failed')
      }

      const data = await uploadResponse.json()
      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images autorisées`)
      return
    }

    setUploading(true)
    const uploadPromises = acceptedFiles.map(uploadToImageKit)

    try {
      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
      toast.success(`${uploadedUrls.length} image(s) téléchargée(s)`)
    } catch (error) {
      toast.error('Erreur lors du téléchargement')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages
  })

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
          ${uploading ? 'animate-pulse' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {uploading
            ? "Téléchargement en cours..."
            : isDragActive
            ? "Déposez les images ici..."
            : `Glissez-déposez des images ou cliquez pour sélectionner`}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {images.length}/{maxImages} images • Max 5MB par image
        </p>
      </div>

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
                type="button"
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

## Environment Variables Template

Create `.env.local.example`:

```env
# Database
DATABASEURL=your_database_url

# NextAuth
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
```

## Testing Checklist

1. **Form Validation**
   - [ ] Required fields show errors when empty
   - [ ] Number fields accept only valid ranges
   - [ ] Coordinates validate correctly

2. **Image Upload**
   - [ ] Drag and drop works
   - [ ] File selection works
   - [ ] Upload progress is shown
   - [ ] Images can be removed
   - [ ] Maximum image limit is enforced

3. **Form Submission**
   - [ ] Data is saved to database
   - [ ] Success message is shown
   - [ ] Redirect works after submission
   - [ ] Error handling works

4. **UI/UX**
   - [ ] Responsive on mobile
   - [ ] Loading states are clear
   - [ ] Error messages are helpful
   - [ ] Form is accessible

## Common Issues and Solutions

### Issue 1: ImageKit Authentication Error
**Solution**: Ensure all ImageKit environment variables are correctly set and the API route is properly configured.

### Issue 2: Form Not Submitting
**Solution**: Check browser console for validation errors. Ensure all required fields are filled.

### Issue 3: Images Not Uploading
**Solution**: 
- Check ImageKit dashboard for API limits
- Verify CORS settings in ImageKit
- Ensure file size is under limit

### Issue 4: Database Errors
**Solution**: 
- Run database migrations
- Check data types match schema
- Verify database connection

## Next Steps

1. **Add Map Integration** (Optional)
   - Integrate Leaflet or Google Maps for location picker
   - Auto-fill coordinates from address

2. **Add Image Optimization**
   - Implement client-side compression
   - Generate thumbnails via ImageKit

3. **Add Bulk Upload**
   - CSV import functionality
   - Batch property creation

4. **Add Property Templates**
   - Save common property configurations
   - Quick fill from templates

5. **Add Analytics**
   - Track form completion rates
   - Monitor upload success rates