import { toAbsoluteUrl } from '@/utils';
import { MiscCreateTeam } from '@/partials/misc';
import { BlockList } from '@/pages/account/security/privacy-settings';
import { Highlights, Teams } from '@/pages/dashboards/app-layout';
import { ManageData } from '@/pages/dashboards/demo2/blocks';
import { Integrations } from './blocks';

const Demo3Content = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <MiscCreateTeam
            image={
              <>
                <img
                  src={toAbsoluteUrl('/media/illustrations/32.svg')}
                  className="dark:hidden max-h-[180px]"
                  alt="image"
                />
                <img
                  src={toAbsoluteUrl('/media/illustrations/32-dark.svg')}
                  className="light:hidden max-h-[180px]"
                  alt="image"
                />
              </>
            }
            className="card h-full"
            title="Swift Setup for New Teams"
            subTitle={
              <>
                Enhance team formation and management with easy-to-use tools for communication,
                <br />
                task organization, and progress tracking, all in one place.
              </>
            }
            engage={{
              path: '/public-profile/teams',
              label: 'Create Team',
              btnColor: 'btn-dark'
            }}
          />
        </div>

        <div className="lg:col-span-1">
          <Highlights />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <Teams />
        </div>

        <div className="lg:col-span-1">
          <BlockList
            className="h-full"
            limit={3}
            text="Users on the block list are unable to send chat requests or messages to you anymore, ever, or again"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <Integrations />
        </div>

        <div className="lg:col-span-1">
          <ManageData className="h-full" />
        </div>
      </div>
    </div>
  );
};

export { Demo3Content };
