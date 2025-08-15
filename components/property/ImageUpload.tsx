"use client"

import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload } from 'lucide-react'
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
    } catch {
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