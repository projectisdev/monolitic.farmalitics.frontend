import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { KeenIcon } from '@/components';

interface ILocationRow {
  country: string;
  province: string;
  municipe: string;
  sectorDirection: string;
}

interface ILocationRows extends Array<ILocationRow> {}

interface IProfileProduct {
  label: string;
}
interface IProfileProducts extends Array<IProfileProduct> {}

const LocationProfile = () => {

  const rows: ILocationRow[] = [
    {
      country: 'República Dominicana',
      province: 'Santo Domingo',
      municipe: 'Pedro Brand',
      sectorDirection: 'Mi Vivienda, Hato Nuevo'
    }
  ];

  const renderRows = (row: ILocationRow, index: number) => {
    return (
      <div key={index} className="flex flex-col gap-6">
        <span className='text-success'>
           <KeenIcon icon="flag
" className="text-success me-1"/>
          <strong className='text-gray-800'>País:</strong> {row.country}
        </span>
        <span className='text-success'>
           <KeenIcon icon="map" className="text-success me-1"/>
          <strong className='text-gray-800'>Provincia:</strong> {row.province}
        </span>
        <span className='text-success'>
           <KeenIcon icon="route" className="text-success me-1"/>
          <strong className='text-gray-800'>Municipio:</strong> {row.municipe}
        </span>
        <span className="text-success break-words max-w-xs">
          <KeenIcon icon="geolocation
" className="text-success me-1"/>
          <strong className="text-gray-800">Sector/Dirección:</strong> {row.sectorDirection}
        </span>
      </div>
    );
  };

  const renderProducts = (product: IProfileProduct, index: number) => {
    return (
      <span key={index} className="badge badge-outline">
        {product.label}
      </span>
    );
  };

  const customIcon = L.divIcon({
    html: `<i class="ki-solid ki-geolocation text-3xl text-success"></i>`,
    className: 'leaflet-marker',
    bgPos: [10, 10],
    iconAnchor: [20, 37],
    popupAnchor: [0, -37]
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Ubicación</h3>
      </div>
      <div className="card-body">

        <div className="flex flex-wrap items-center gap-10 mb-10">
          <div className="flex flex-col gap-10">
            {rows.map(renderRows)}
          </div>
            <MapContainer
              center={[19.0, -70.0]} // Centro aproximado de República Dominicana
              zoom={7}
              className="rounded-xl w-full md:w-80 min-h-52"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[18.4861, -69.9312]} icon={customIcon}>
                <Popup>República Dominicana</Popup>
              </Marker>
            </MapContainer>
        </div>
        
        {/* //TODO: Eliminar esta parte / Ver si se puede reutilizar */}
        {/* <div className="flex flex-col gap-4 mb-2.5">
          <div className="text-md font-semibold text-gray-900">Products</div>
          <div className="flex flex-wrap gap-2.5">
            {products.map((product, index) => {
              return renderProducts(product, index);
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export {
  LocationProfile,
  type ILocationRow,
  type ILocationRows,
  type IProfileProduct,
  type IProfileProducts
};
