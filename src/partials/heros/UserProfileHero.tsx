import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { IUserProfileHeroProps } from './types';
import { toAbsoluteUrl } from '@/utils';
import { useSettings } from '@/providers';

const UserProfileHero = ({ image, name }: IUserProfileHeroProps) => {
  const { getThemeMode } = useSettings();

  const render = () => {
    return (
      <div
        className="bg-center bg-cover bg-no-repeat hero-bg"
        style={{
          backgroundImage:
            getThemeMode() === 'dark'
              ? `url('${toAbsoluteUrl('/media/images/2600x1200/bg-1-dark.png')}')`
              : `url('${toAbsoluteUrl('/media/images/2600x1200/bg-1.png')}')`
        }}
      >
        <Container>
          <div className="flex flex-col items-center gap-2 lg:gap-3.5">
            {image}

            <div className="flex items-center gap-1.5">
                <div className="text-2xl leading-7 font-bold text-gray-900">{name}</div>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  return render();
};

export { UserProfileHero };
