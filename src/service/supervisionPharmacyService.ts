import { ISupervision } from '../types/Supervision';

// Obtener todas las Supervisiones

export const getAllSupervisionPharmacy = async (): Promise<ISupervision[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/supervisions`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener las supervisiones: ${errorText}`);
  }

  const data = await response.json();
  return data as ISupervision[];
};


export const createSupervisionPharmacy = async (supervision: {
  pharmacy_id: string;
  supervision_date: string;
  supervision_time: string;
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/supervisions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supervision),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear la supervisión: ${errorText}`);
  }

  return await response.json();
};

// Eliminar Supervision

export const deleteSupervisionPharmacyById = async (id: string): Promise<void> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/supervisions/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al eliminar la supervisión: ${errorText}`);
  }
};



export const updateSupervisionPharmacyById = async (
  id: string,
  updateData: {
    pharmacy_id: string;
    supervision_date: string;
    supervision_time: string;
    status: string;
  }
): Promise<any> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/supervisions/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al actualizar la supervisión: ${errorText}`);
  }

  return await response.json(); 
};


export const getSupervisionPharmacyById = async (id: string): Promise<ISupervision> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/supervisions/${encodeURIComponent(id)}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al obtener supervisión');
  }

  const data: ISupervision = await response.json();
  return data;
};

