import { useNavigate } from 'react-router-dom';

import {
  ChannelStats,
  EarningsChart,
  EntryCallout,
  Highlights,
  TeamMeeting,
  Teams
} from './blocks';

const AppLayoutLightSidebarContent = () => {
  // Importa useNavigate de react-router-dom

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-blue-100">
          <i className="ki-duotone ki-menu text-5xl text-blue-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Lista de Farmacias</span>
        <button
          type="button"
          onClick={() => navigate('/pharmacy/list')}
          className="flex items-center justify-center mt-2 btn-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Acceder
           <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-green-100">
          <i className="ki-duotone ki-arrow-two-diagonals text-5xl text-green-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Añadir Farmacia</span>
        <button
          type="button"
          onClick={() => navigate('/pharmacy/list/add-pharmacy')}
          className="flex items-center justify-center mt-2 btn-sm px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Acceder
           <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-yellow-100">
          <i className="ki-duotone ki-minus-circle text-5xl text-yellow-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Lista de Supervisión</span>
        <button
          type="button"
          onClick={() => navigate('/supervision/list')}
          className="flex items-center justify-center mt-2 px-4 btn-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Acceder
           <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>
      {/* Card 4 */}
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-purple-100">
          <i className="ki-duotone ki-magnifier text-5xl text-purple-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Historial de Inspecciones</span>
        <button
          type="button"
          onClick={() => navigate('/inspection-history/list')}
          className="flex items-center justify-center mt-2 px-4 btn-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Acceder
           <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-gray-100">
          <i className="ki-duotone ki-scan-barcode text-5xl text-gray-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Renovación de Licencias</span>
        <button
          type="button"
          onClick={() => navigate('/renew-licenses/list')}
          className="flex items-center justify-center mt-2 px-4 btn-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Acceder
           <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 mb-3 rounded-full bg-red-100">
          <i className="ki-duotone ki-plus-squared text-5xl text-red-500"></i>
        </div>
        <span className="text-lg font-semibold mb-2">Sanciones</span>
        <button
          type="button"
          onClick={() => navigate('/sanciones-list')}
          className=" flex items-center justify-centermt-2 px-4 btn-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Acceder
            <i className="ki-duotone ki-arrow-right text-5xl ms-1 text-white"></i>
        </button>
      </div>
    </div>
  );
};

export { AppLayoutLightSidebarContent };