import { useEffect, useState } from 'react';
import { KeenIcon } from '@/components';
import { fetchCountries, fetchProvinces, fetchMunicipalities } from '@/service/locationService';

interface ICountry {
  id: string;
  name: string;
}

interface IProvince {
  id: string;
  name: string;
}

interface IMunicipality {
  id: string;
  name: string;
}

const LocationProfile = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [municipalities, setMunicipalities] = useState<IMunicipality[]>([]);
  const [loading, setLoading] = useState(true);

  // Paso 1: cargar países
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData.slice(0, 3));
      } catch {
        setCountries([]);
      }
    };
    loadCountries();
  }, []);

  // Paso 2: cargar provincias cuando countries cambie y tenga datos
  useEffect(() => {
    if (countries.length === 0) {
      setProvinces([]);
      return;
    }

    const loadProvinces = async () => {
      try {
        const provincesData = await fetchProvinces(countries[0].id);
        setProvinces(provincesData.slice(0, 3));
      } catch {
        setProvinces([]);
      }
    };
    loadProvinces();
  }, [countries]);

  // Paso 3: cargar municipios cuando provinces cambie y tenga datos
  useEffect(() => {
    if (provinces.length === 0) {
      setMunicipalities([]);
      return;
    }

    const loadMunicipalities = async () => {
      try {
        const municipalitiesData = await fetchMunicipalities(provinces[0].id);
        setMunicipalities(municipalitiesData.slice(0, 3));
      } catch {
        setMunicipalities([]);
      } finally {
        setLoading(false);
      }
    };
    loadMunicipalities();
  }, [provinces]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Resumen de Ubicaciones</h3>
      </div>
      <div className="card-body pt-3.5 pb-3.5">
        <div className="flex flex-col gap-4">
          <div>
            <strong className="text-gray-800 flex items-center gap-2 mb-1">
              <KeenIcon icon="globe" className="text-success" /> Países (3 primeros)
            </strong>
            {countries.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {countries.map((country) => (
                  <li key={country.id}>{country.name}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No hay países disponibles</span>
            )}
          </div>

          <div>
            <strong className="text-gray-800 flex items-center gap-2 mb-1">
              <KeenIcon icon="map-marker" className="text-success" /> Provincias (3 primeras)
            </strong>
            {provinces.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {provinces.map((province) => (
                  <li key={province.id}>{province.name}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No hay provincias disponibles</span>
            )}
          </div>

          <div>
            <strong className="text-gray-800 flex items-center gap-2 mb-1">
              <KeenIcon icon="city" className="text-success" /> Municipios (3 primeros)
            </strong>
            {municipalities.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {municipalities.map((municipality) => (
                  <li key={municipality.id}>{municipality.name}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No hay municipios disponibles</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { LocationProfile };
