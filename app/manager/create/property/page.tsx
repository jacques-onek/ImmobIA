import React from 'react'
import { PropertyForm } from '@/components/property/PropertyForm'

export default function CreatePropertyPage() {
  return (
    <div className="container  mx-auto py-8 px-4">
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
