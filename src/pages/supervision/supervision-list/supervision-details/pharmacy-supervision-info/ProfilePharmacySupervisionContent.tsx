import {
  LocationProfile,

  GeneralDataSupervision,
  InspectionListPage
} from './blocks';

const ProfilePharmacySupervisionContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1 lg:col-span-3">
      <InspectionListPage />
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          
          <GeneralDataSupervision />

            
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <LocationProfile />


        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
           
          </div>
        </div>
      </div>

      
    </div>
  );
};

export { ProfilePharmacySupervisionContent };
