import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { KeenIcon } from '@/components';
import { IGeneralData } from '@/types/Pharmacy';
import { getPharmacyById } from '@/service/pharmacyService';

const GeneralData = () => {
  const { id } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<IGeneralData | null>(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        if (id) {
          const found = await getPharmacyById(id);
          setPharmacy(found);
        }
      } catch (error) {
        setPharmacy(null);
      }
    };
    fetchPharmacy();
  }, [id]);

  if (!pharmacy) {
    return (
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Datos Generales</h3>
      </div>
      <div className="card-body pt-3.5 pb-3.5">
        <div className="flex flex-col gap-2.5">
          <span className="text-gray-700 mb-1 flex items-center gap-2">
            <KeenIcon icon="credit-cart" className="text-success" />
            <strong className="text-gray-800">RNC | Cédula:</strong>
            {pharmacy.legal_identity}
          </span>
          {pharmacy.phone && (
            <span className="text-gray-700 mb-1 flex items-center gap-2">
              <KeenIcon icon="phone" className="text-success" />
              <strong className="text-gray-800">Teléfono:</strong> {pharmacy.phone}
            </span>
          )}
          {pharmacy.email && (
            <span className="text-success mb-1 flex items-center gap-2">
              <KeenIcon icon="sms" className="text-success" />
              <strong className="text-gray-800">Email:</strong>{' '}
              <a
                href={`mailto:${pharmacy.email}`}
                className="text-success font-semibold"
                style={{ cursor: 'pointer' }}
                title={pharmacy.email}
              >
                {pharmacy.email}
              </a>
            </span>
          )}
          <span className="text-gray-700 mb-1 flex items-center gap-2">
            <KeenIcon icon="check-circle" className="text-success" />
            <strong className="text-gray-800">Estado:</strong>{' '}
            <span
              className={`badge badge-sm ${
                pharmacy.status === 'Activa'
                  ? 'badge-success badge-outline'
                  : 'badge-danger badge-outline'
              }`}
              style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              {pharmacy.status}
            </span>
          </span>
          <span className="text-gray-700 mb-1 flex items-center gap-2">
            <KeenIcon icon="questionnaire-tablet" className="text-success" />
            <strong className="text-gray-800">Tipo de Farmacia:</strong> {pharmacy.pharmacy_type}
          </span>
          {pharmacy.number_of_employees && (
            <span className="text-gray-700 mb-1 flex items-center gap-2">
              <KeenIcon icon="users" className="text-success" />
              <strong className="text-gray-800">Empleados:</strong> {pharmacy.number_of_employees}
            </span>
          )}
          {pharmacy.opening_date && (
            <span className="text-gray-700 mb-1 flex items-center gap-2">
              <KeenIcon icon="calendar-tick" className="text-success" />
              <strong className="text-gray-800">Fecha de apertura:</strong>{' '}
              {new Date(pharmacy.opening_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export { GeneralData };
