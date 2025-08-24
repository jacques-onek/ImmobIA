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


export const PROPERTY_FORM_CONTENT = [
     {
      CardTitle:"Informations de base",
      CardDescription:"Détails principaux de votre propriété",
      CardFields:[
         {
          PropertyLabel:"Nom de la propriété",
          PropertyName:"name",
          PlaceHolder:"Villa moderne...",
          Type:"text"
         },
         {
          PropertyLabel:"Prix ($)",
          PropertyName:"price",
          PlaceHolder:"50000",
          Type:"number"
         },
         {
          PropertyLabel:"Type de propriété",
          PropertyName:"type",
          PlaceHolder:"Sélectionnez un type",
          Type:"select"
         },
         {
          PropertyLabel:"Surface (m²)",
          PropertyName:"area",
          PlaceHolder:"120",
          Type:"number"
         }
      ]
     },
     {
      CardTitle:"Détails de la propriété",
      CardDescription:" Caractéristiques spécifiques",
      CardFields:[
         {
          PropertyLabel:"Chambres",
          PropertyName:"bedrooms",
          PlaceHolder:"Villa moderne...",
          Type:"number"
         },
         {
          PropertyLabel:"Salles de bain",
          PropertyName:"bathrooms",
          PlaceHolder:"0",
          Type:"number"
         },
         {
          PropertyLabel:"Note (1-5)",
          PropertyName:"rating",
          PlaceHolder:"",
          Type:"number"
         },
         {
          PropertyLabel:"Surface (m²)",
          PropertyName:"available",
          PlaceHolder:"120",
          Type:"checkbox"
         }
      ]
     },
     {
      CardTitle:"Localisation",
      CardDescription:"  Adresse et coordonnées géographiques",
      CardFields:[
         {
          PropertyLabel:"Adresse complète",
          PropertyName:"address",
          PlaceHolder:"123 Avenue de la Paix, Kinshasa...",
          Type:"texterea"
         },
         {
          PropertyLabel:"longitude",
          PropertyName:"longitude",
          PlaceHolder:"0",
          Type:"number"
         },
      ]
     }
]