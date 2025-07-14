import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfilePharmacyContent } from '.';
import { getPharmacyById } from '@/service/pharmacyService';

const ProfilePharmacyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<any>(null);

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
    return <div className="flex items-center justify-center min-h-[120px]">
      <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
    </div>;
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
      <UserProfileHero
        name={pharmacy?.name || ''}
        image={image}
      />

      <Container>
        {/* Aquí puedes agregar más contenido si es necesario */}
      </Container>

      <Container>
        <ProfilePharmacyContent />
      </Container>
    </Fragment>
  );
};

export { ProfilePharmacyPage };
