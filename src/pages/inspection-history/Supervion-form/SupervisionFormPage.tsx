import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { KeenIcon } from '@/components';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

// Simulación de farmacias, reemplaza por tu fetch real si es necesario
const pharmacies = [
  { pharmacyId: '1', pharmacyName: 'Farmacia Central' },
  { pharmacyId: '2', pharmacyName: 'Farmacia Popular' },
  { pharmacyId: '3', pharmacyName: 'Farmacia Moderna' }
];

const supervisionSchema = Yup.object().shape({
  pharmacyId: Yup.string().required('La farmacia es obligatoria'),
  technicalManager: Yup.string().required('El nombre del encargado de inspección es obligatorio'),
  supervisionDate: Yup.date().required('La fecha es obligatoria'),
  supervisionTime: Yup.string().required('La hora es obligatoria')
});

const SupervisionFormPage = () => {
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      pharmacyId: '',
      technicalManager: '',
      supervisionDate: new Date(),
      supervisionTime: ''
    },
    validationSchema: supervisionSchema,
    onSubmit: (values) => {
      // Manejar submit aquí
      navigate('/supervision/list');
    }
  });

  const selectedPharmacy = pharmacies.find(p => p.pharmacyId === formik.values.pharmacyId);

  return (
    <form className="card pb-2.5 max-w-3xl mx-auto" onSubmit={formik.handleSubmit}>
      <div className="card-header" id="basic_settings">
        <h3 className="card-title">Nueva Supervisión</h3>
      </div>
      <div className="card-body grid gap-5">
        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="form-label required">
              Farmacia <span className="text-red-500"> *</span>
            </label>
            <Select
              value={formik.values.pharmacyId}
              onValueChange={value => formik.setFieldValue('pharmacyId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una farmacia" />
              </SelectTrigger>
              <SelectContent>
                {pharmacies.map(pharmacy => (
                  <SelectItem key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>
                    {pharmacy.pharmacyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.pharmacyId && formik.errors.pharmacyId && (
              <div className="text-red-500 text-xs">{formik.errors.pharmacyId}</div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="form-label required">
              Encargado de inspección <span className="text-red-500"> *</span>
            </label>
            <input
              className="input"
              type="text"
              name="technicalManager"
              placeholder="Nombre del encargado de inspección"
              value={formik.values.technicalManager}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.technicalManager && formik.errors.technicalManager && (
              <div className="text-red-500 text-xs">{formik.errors.technicalManager}</div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="form-label required">Fecha de Supervisión <span className="text-red-500"> *</span></label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="supervisionDate"
                  className={cn(
                    'input data-[state=open]:border-primary',
                    !formik.values.supervisionDate && 'text-muted-foreground'
                  )}
                  onClick={() => setCalendarOpen(true)}
                >
                  <KeenIcon icon="calendar" className="-ms-0.5" />
                  {formik.values.supervisionDate
                    ? format(new Date(formik.values.supervisionDate), 'LLL dd, y')
                    : <span>Seleccionar fecha</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={formik.values.supervisionDate ? new Date(formik.values.supervisionDate) : undefined}
                  selected={formik.values.supervisionDate ? new Date(formik.values.supervisionDate) : undefined}
                  onSelect={date => {
                    formik.setFieldValue('supervisionDate', date);
                    setCalendarOpen(false);
                  }}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
            {formik.touched.supervisionDate && formik.errors.supervisionDate && (
              <div className="text-red-500 text-xs">{formik.errors.supervisionDate as string}</div>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="form-label required">Hora de Supervisión <span className="text-red-500"> *</span></label>
            <input
              className="input"
              type="time"
              name="supervisionTime"
              value={formik.values.supervisionTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.supervisionTime && formik.errors.supervisionTime && (
              <div className="text-red-500 text-xs">{formik.errors.supervisionTime}</div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-2.5">
            <button
            type="button"
            className="btn btn-sm bg-gray-200 text-gray-600 hover:[background-color:#EAEFF3] transition-colors flex items-center gap-2"
            onClick={() => navigate('/supervision/list')}
            >
            Cancelar
            </button>
            <button
            type="submit"
            className="btn btn-sm btn-greenA text-white hover:[background-color:#7BCC2F] transition-colors flex items-center gap-2"
            onClick={e => {
              // Evita que el submit se dispare dos veces
              e.preventDefault();
              formik.validateForm().then(errors => {
              if (Object.keys(errors).length === 0) {
                toast.success('Agenda agregada con éxito', {
                icon: <KeenIcon icon="check-circle" className="text-green-500" />,
                });
                formik.handleSubmit();
              }
              });
            }}
            >
            Agendar
            </button>
        </div>
      </div>
    </form>
  );
};

export { SupervisionFormPage };
