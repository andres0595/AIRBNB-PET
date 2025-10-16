export interface PersonalInfoData {
  percentage: number;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postCode: string;
  housingType: "casa" | "apartamento" | "";
  idDocument: string;
  uploadedFiles: string[];
}
