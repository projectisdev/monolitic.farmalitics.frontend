import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { ProfileCompanyContent } from '.';

const ProfileSupervisionPage = () => {
  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light">
      <img src={toAbsoluteUrl('/media/brand-logos/PlusPharmacy.svg')} className="size-[100px]" />
    </div>
  );

  return (
    <Fragment>
      <UserProfileHero
        name="Farmacia Carol"
        image={image}
        
      />

      <Container>
        
      </Container>

      <Container>
        <ProfileCompanyContent />
      </Container>
    </Fragment>
  );
};

export { ProfileSupervisionPage };
