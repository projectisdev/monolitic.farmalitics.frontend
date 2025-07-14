import { IPharmacy } from '../types/Pharmacy';

// Listar Farmacias con filtro opcional
export const getPharmacies = async (status?: string): Promise<IPharmacy[]> => {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/pharmacies${query}`);

  
  if (!response.ok) {
    throw new Error('Error al obtener farmacias');
  }

  const data = await response.json();
  return data as IPharmacy[];
};

// Eliminar farmacia físicamente por ID
export const deletePharmacy = async (id: string): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/pharmacies/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la farmacia');
  }
};

// Crear farmacias

export const createPharmacy = async (pharmacy: 
  { 
    name: string; 
    legal_identity: string;
    phone: string;
    email: string;
    country_id: number,
    province_id: number,
    municipality_id: number,
    address: string;
    pharmacy_type: string;
    number_of_employees: string;
    opening_date: string | null;
    status: string;
  }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/pharmacies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pharmacy),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear la farmacia: ${errorText}`);
  }

  return await response.json();
};

// Actualizar Farmacia


export const getPharmacyById = async (pharmacyId: string): Promise<IPharmacy> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/pharmacies/${encodeURIComponent(pharmacyId)}`);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al obtener farmacia');
  }

  const data: IPharmacy = await res.json();
  return data;
};


export const updatePharmacyById = async (pharmacyId: string, pharmacyData: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/pharmacies/${encodeURIComponent(pharmacyId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pharmacyData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al actualizar la farmacia: ${errorText}`);
  }
  return await res.json();
};


// Activar o Inactivar farmacia

const apiUrl = import.meta.env.VITE_API_URL;

export const updatePharmacyStatus = async (pharmacyId: string, status: 'Activa' | 'Inactiva') => {
  const response = await fetch(`${apiUrl}/pharmacies/${pharmacyId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar estado: ${errorText}`);
  }

  return await response.json();
};

export async function fetchActivePharmacies() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/pharmacies/active/all`); // <-- cambio aquí
  if (!res.ok) throw new Error('Error al cargar farmacias activas');
  return res.json();
}


