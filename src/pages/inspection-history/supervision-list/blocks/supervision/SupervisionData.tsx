import { IAvatarsProps } from '@/partials/common';

interface ISupervisionPharmacy {
  supervisionId: string;
  pharmacyId: string;
  pharmacyName?: string;
  technicalManager: string;
  supervisionDate: string;
  supervisionTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const SupervisionData: ISupervisionPharmacy[] = [

{
  supervisionId: '1',
  pharmacyId: 'PH001',
  pharmacyName: 'Farmacia Central',
  technicalManager: 'Dra. Ana López',
  supervisionDate: '2024-06-01',
  supervisionTime: '10:00 A.M.',
  status: 'Pendiente',
  createdAt: '2024-05-20T09:00:00Z',
  updatedAt: '2024-05-21T12:00:00Z',
}
];


export { SupervisionData, type ISupervisionPharmacy };
