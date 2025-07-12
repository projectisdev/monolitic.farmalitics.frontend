import { KeenIcon } from "@/components";

interface IGeneralData {
  rncOrIdCard: string;
  namePharmacy: string;
  phone: string;
  email: string;
  status: TypeStatusEnum;
  typePharmacy: TypePharmacyEnum;
  employee: number;
  openingDate: Date;
}

enum TypePharmacyEnum {
  RETAIL = 'Retail',
  HOSPITAL = 'Hospitalaria',
}
enum TypeStatusEnum {
  ACTIVE = 'Activa',
  INACTIVE = 'Inactiva'
}


interface IGeneralDatas extends Array<IGeneralData> {}

const GeneralData = () => {

  // Datos de ejemplo de una farmacia
  const items: IGeneralDatas = [
    {
      rncOrIdCard: "13123123123",
      namePharmacy: "Farmacia Central",
      phone: "(829) 372-4391",
      email: "farmaciacarol@farmacia.com",
      typePharmacy: TypePharmacyEnum.RETAIL,
      employee: 12,
      openingDate: new Date("2015-03-15"),
      status: TypeStatusEnum.ACTIVE,
    },
  ];

  const renderItems = (item: IGeneralData, index: number) => {
    return (
      <div key={index} className="flex flex-col gap-2.5">
        <span className="text-gray-700 mb-1 flex items-center gap-2">
        <KeenIcon icon="credit-cart
" className="text-success"/>
        <strong className="text-gray-800">RNC | Cédula:</strong>{item.rncOrIdCard}
        </span>
        <span className="text-gray-700 mb-1 flex items-center gap-2">
         <KeenIcon icon="phone" className="text-success"/>
        <strong className="text-gray-800">Teléfono:</strong> {item.phone}
        </span>
        <span className="text-success mb-1 flex items-center gap-2">
          <KeenIcon icon="sms" className="text-success"/>
        <strong className="text-gray-800">Email:</strong>{" "}
        <a
          href={`mailto:${item.email}`}
          className="text-success font-semibold"
          style={{ cursor: "pointer" }}
          title={item.email}
        >
          {item.email}
        </a>
        </span>
        <span className="text-gray-700 mb-1 flex items-center gap-2">
        <KeenIcon icon="check-circle" className="text-success"/>
        <strong className="text-gray-800">Estado:</strong>{" "}
        <span
          className={`badge badge-sm ${item.status === TypeStatusEnum.ACTIVE ? "badge-success badge-outline" : "badge-danger badge-outline"}`}
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}
        >
          {item.status === TypeStatusEnum.ACTIVE ? "Activa" : "Inactiva"}
        </span>
        </span>
        <span className="text-gray-700 mb-1 flex items-center gap-2">
        <KeenIcon icon="questionnaire-tablet" className="text-success"/>
        <strong className="text-gray-800">Tipo de Farmacia:</strong> {item.typePharmacy}
        </span>
        <span className="text-gray-700 mb-1 flex items-center gap-2">
         <KeenIcon icon="users" className="text-success"/>
        <strong className="text-gray-800">Empleados:</strong> {item.employee}
        </span>
        <span className="text-gray-700 mb-1 flex items-center gap-2">
        <KeenIcon icon="calendar-tick" className="text-success"/>
        <strong className="text-gray-800">Fecha de apertura:</strong> {item.openingDate.toLocaleDateString()}
        </span>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Datos Generales</h3>
      </div>

      <div className="card-body pt-3.5 pb-3.5">
        <table className="table-auto">
          <tbody>
            {items.map((item, index) => {
              return renderItems(item, index);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { GeneralData, type IGeneralData, type IGeneralDatas };

{/* <span class="badge badge-sm badge-success badge-outline">Subscribed</span> */}