// import { Connections, Contributions, Projects, Tags } from '../default';
import {
  Statistics,
  GeneralData,
  OpenJobs,
  Network,
  CompanyProfile,
  Locations,
  IStatisticsItems,
  INetworkItems
} from './blocks';

const ProfilePharmacyContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1 lg:col-span-3">
        {/* <Statistics items={items} /> */}
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <GeneralData />

          

          {/* <Network title="Network" data={data} /> */}

          {/* <Tags title="Tags" /> */}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <CompanyProfile />
          {/* <OpenJobs /> */}

          {/* <Locations /> */}

          {/* <Projects /> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            {/* <Connections title="Members" /> */}

            {/* <Contributions title="Investments" /> */}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export { ProfilePharmacyContent };
