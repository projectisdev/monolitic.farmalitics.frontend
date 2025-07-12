import { GeneralData, LocationProfile } from './blocks';
import { InspectionTableReports } from './inspection-table-reports';


const ProfileCompanyContent = () => {

  return (

    
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-7.5">

      <div className="col-span-1 lg:col-span-3">
      <div className="col-span-1 lg:col-span-3">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <InspectionTableReports/>
        </div>
      </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <GeneralData/>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <LocationProfile />
        </div>
        
      </div>

    </div>

    
  );
};

export { ProfileCompanyContent };
