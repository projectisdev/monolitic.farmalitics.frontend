import { IAvatarsProps } from '@/partials/common';

interface ITeamData {
  pharmacy: {
    id: string;
    rncOrIdCard: string;
    pharmacyName: string;
    email: string;
  };
  telephone: string;
  status: {
    label: string,
    color: string
  },
  pharmacyType: string;
  date: string;
}

const SupervisionData: ITeamData[] = [
  {
    pharmacy: {
      id: '1',
      rncOrIdCard: '131231231',
      pharmacyName: 'Farmacia Carol',
      email: 'farmaciacarol@dominio.com.do'
    },
    telephone: '(829) 372-4391',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '21 Oct, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '2',
      rncOrIdCard: '201234567',
      pharmacyName: 'Farmacia GBC',
      email: 'gbc@dominio.com.do'
    },
    telephone: '(809) 567-1111',
    status: {
      label: 'Inactiva',
      color: 'danger'
    },
    date: '10 Sep, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '3',
      rncOrIdCard: '132456789',
      pharmacyName: 'Farmacias Medicar GBC',
      email: 'medicar@dominio.com.do'
    },
    telephone: '(809) 732-1234',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '05 Nov, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '4',
      rncOrIdCard: '123456789',
      pharmacyName: 'Farmacia El Sol',
      email: 'elsol@dominio.com.do'
    },
    telephone: '(809) 555-9000',
    status: {
      label: 'Inactiva',
      color: 'danger'
    },
    date: '12 Jul, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '5',
      rncOrIdCard: '987654321',
      pharmacyName: 'Farmacia Los Hidalgos',
      email: 'loshidalgos@dominio.com.do'
    },
    telephone: '(809) 241-0000',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '18 Jun, 2024',
    pharmacyType: "Hospitalaria"
  },
  {
    pharmacy: {
      id: '6',
      rncOrIdCard: '654321987',
      pharmacyName: 'Farmacia Cedimat',
      email: 'cedimat@dominio.com.do'
    },
    telephone: '(809) 565-9989',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '30 Aug, 2024',
    pharmacyType: "Hospitalaria"
  },
  {
    pharmacy: {
      id: '7',
      rncOrIdCard: '321654987',
      pharmacyName: 'Farmacia Plaza de la Salud',
      email: 'plazasalud@dominio.com.do'
    },
    telephone: '(809) 533-4911',
    status: {
      label: 'Inactiva',
      color: 'danger'
    },
    date: '04 May, 2024',
    pharmacyType: "Hospitalaria"
  },
  {
    pharmacy: {
      id: '8',
      rncOrIdCard: '456789123',
      pharmacyName: 'Farmacia HOMS',
      email: 'homs@dominio.com.do'
    },
    telephone: '(809) 247-1111',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '15 Mar, 2024',
    pharmacyType: "Hospitalaria"
  },
  {
    pharmacy: {
      id: '9',
      rncOrIdCard: '789123456',
      pharmacyName: 'Farmacia UCE',
      email: 'ucefarmacia@dominio.com.do'
    },
    telephone: '(809) 689-4181',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '09 Feb, 2024',
    pharmacyType: "Hospitalaria"
  },
  {
    pharmacy: {
      id: '10',
      rncOrIdCard: '147258369',
      pharmacyName: 'Farmacia Metro',
      email: 'metro@dominio.com.do'
    },
    telephone: '(809) 200-0000',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '23 Apr, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '11',
      rncOrIdCard: '963852741',
      pharmacyName: 'Farmacia Medipromo',
      email: 'medipromo@dominio.com.do'
    },
    telephone: '(809) 222-2222',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '29 Jan, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '12',
      rncOrIdCard: '852741963',
      pharmacyName: 'Farmacia Farmax',
      email: 'farmax@dominio.com.do'
    },
    telephone: '(809) 444-3333',
    status: {
      label: 'Inactiva',
      color: 'danger'
    },
    date: '17 Dec, 2024',
    pharmacyType: "Retail"
  },
  {
    pharmacy: {
      id: '13',
      rncOrIdCard: '741963852',
      pharmacyName: 'Farmacia Cruz Jiminian',
      email: 'cruzjiminian@dominio.com.do'
    },
    telephone: '(809) 566-6666',
    status: {
      label: 'Activa',
      color: 'success'
    },
    date: '03 Jan, 2024',
    pharmacyType: "Hospitalaria"
  }
];


export { SupervisionData, type ITeamData };
