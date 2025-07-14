import { Link } from 'react-router-dom';

import { KeenIcon } from '@/components';

interface ISupervisionReportItem {
  icon: string;
  name: string;
  date: string;
}

interface ISupervisionReportItems extends Array<ISupervisionReportItem> {}

const OpenJobs = () => {
  
  const items: ISupervisionReportItems = [
    {
      icon: 'clipboard',
      name: 'Reporte de Supervisión',
      date: '2024-06-01',
    },
    {
      icon: 'clipboard',
      name: 'Reporte de Supervisión',
      date: '2024-06-02',
    },
    {
      icon: 'clipboard',
      name: 'Reporte de Supervisión',
      date: '2024-06-03',
    },
  ];

  // <KeenIcon icon={item.icon} className="text-base text-gray-600" />

  const renderItems = (item: ISupervisionReportItem, index: number) => {
    return (
      <div key={index} className="flex align-start gap-3.5">
        <div className="flex items-center justify-center w-[1.875rem] h-[1.875rem] bg-gray-100 rounded-lg border border-gray-300">
          <KeenIcon icon={item.icon} className="text-base text-gray-600" />
        </div>
        <div className="flex flex-col">
          <a href="#" className="text-sm font-semibold leading-none text-success mb-1">
            {item.name}
          </a>
          <span className="text-sm font-medium text-gray-900">{item.date}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Reportes de Supervisión</h3>
      </div>

      <div className="card-body">
        <div className="grid gap-5">
          {items.map((item, index) => {
            return renderItems(item, index);
          })}
        </div>
      </div>
    </div>
  );
};

export { OpenJobs, type ISupervisionReportItem, type ISupervisionReportItems };
