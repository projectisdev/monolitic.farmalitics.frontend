const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchCountries() {
  const res = await fetch(`${apiUrl}/api/location/countries`);
  if (!res.ok) throw new Error('Error al cargar países');
  return res.json();
}

export async function fetchProvinces(countryId: string | number) {
  const res = await fetch(`${apiUrl}/api/location/provinces/${countryId}`);
  if (!res.ok) throw new Error('Error al cargar provincias');
  return res.json();
}

export async function fetchMunicipalities(provinceId: string | number) {
  const res = await fetch(`${apiUrl}/api/location/municipalities/${provinceId}`);
  if (!res.ok) throw new Error('Error al cargar municipios');
  return res.json();
}