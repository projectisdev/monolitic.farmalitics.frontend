import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { getPharmacyById } from '@/service/pharmacyService';
import { getSupervisionPharmacyById } from '@/service/supervisionPharmacyService';
import { ProfilePharmacySupervisionContent } from './ProfilePharmacySupervisionContent';

const ProfilePharmacySupervisionPage = () => {
  const { id: supervisionId } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<any>(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        if (!supervisionId) return;

        // 🔁 Primero busca la supervisión
        const supervision = await getSupervisionPharmacyById(supervisionId);

        // ✅ Luego busca la farmacia
        const found = await getPharmacyById(supervision.pharmacy_id);

        setPharmacy(found);
      } catch (error) {
        console.error('Error al obtener farmacia desde supervisión:', error);
        setPharmacy(null);
      }
    };
    fetchPharmacy();
  }, [supervisionId]);

  if (!pharmacy) {
    return (
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
      </div>
    );
  }

  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light">
      <img
        src={pharmacy?.image || toAbsoluteUrl('/media/brand-logos/PlusPharmacy.svg')}
        className="size-[100px]"
        alt={pharmacy?.name || 'Pharmacy'}
      />
    </div>
  );

  return (
    <Fragment>
      <UserProfileHero name={pharmacy?.name || ''} image={image} />

      <Container>{/* Aquí puedes agregar más contenido si es necesario */}</Container>

      <Container>
        <ProfilePharmacySupervisionContent />
      </Container>
    </Fragment>
  );
};

export { ProfilePharmacySupervisionPage };
