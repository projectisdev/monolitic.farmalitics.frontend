const apiUrl = import.meta.env.VITE_API_URL;

import { IMedicineType } from '@/types/medicineType';

export const createMedicineType = async (medicine: {
  name: string;
  risk_level: 'Ninguno' | 'Bajo' | 'Medio' | 'Alto';
}): Promise<void> => {
  const res = await fetch(`${apiUrl}/medicine-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicine),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al crear tipo de medicina');
  }
};




export const getAllMedicineTypes = async (): Promise<IMedicineType[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/medicine-types`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener los tipos de medicamento: ${errorText}`);
  }

  const data = await response.json();
  return data as IMedicineType[];
};


export const deleteMedicineTypeById = async (id: number): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/medicine-type/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al eliminar tipo de medicina: ${errorText}`);
  }
};
