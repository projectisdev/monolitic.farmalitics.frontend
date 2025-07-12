export interface IPharmacy {
  pharmacy_id: number;
  name: string;
  legal_identity: string;
  phone?: string;
  email?: string;
  country_id?: string;
  province_id?: string;
  municipality_id?: string;
  address?: string;
  pharmacy_type: string;
  number_of_employees?: string;
  opening_date?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface IGeneralData {
  pharmacy_id: number;
  name: string;
  legal_identity: string;
  phone?: string;
  email?: string;
  status: string;
  pharmacy_type: string;
  number_of_employees?: string;
  opening_date?: string;
}