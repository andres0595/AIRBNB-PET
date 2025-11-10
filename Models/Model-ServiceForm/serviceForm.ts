export interface ServiceFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export interface DaycareFormData {
  duration: string;
  maximumCapacity: number;
  acceptsAggressiveAnimals: boolean;
  requiresVaccination: boolean;
  animalCertifications: string[];
  restArea: string[];
  communication: string[];
  servicesIncluded: string[];
}

export interface CareHomeFormData {
  skills: string[];
  experienceLevel: string;
  availability: string;
}

export interface BathroomFormData {
  experience: string;
  level: string;
  experienceWith: string[];
  bathtypes: string[];
  petsserved: string[];
  products: string[];
  safety: string[];
}
