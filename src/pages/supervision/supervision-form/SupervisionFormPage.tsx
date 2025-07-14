import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchActivePharmacies } from '@/service/pharmacyService';
import { KeenIcon } from '@/components';
import {
  createSupervisionPharmacy,
  getSupervisionPharmacyById,
  updateSupervisionPharmacyById
} from '@/service/supervisionPharmacyService';
import { ISupervision } from '@/types/Supervision';

const pharmacySupervisionSchema = Yup.object().shape({
  pharmacy_id: Yup.string().required('La farmacia es obligatoria'),
  pharmacy_name: Yup.string(),
  supervision_date: Yup.string().required('La fecha de supervisión es obligatoria'),
  supervision_time: Yup.string().required('La hora de supervisión es obligatoria')
});

const SupervisionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [supervisionPharmacy, setPharmacy] = useState<{ pharmacy_id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<ISupervision>({
    enableReinitialize: true,
    initialValues: {
      supervision_id: '',
      pharmacy_name: '',
      pharmacy_id: '', // string para mantener coherencia con value de <option>
      supervision_date: '',
      supervision_time: '',
      status: '',
      created_at: ''
    },
    validationSchema: pharmacySupervisionSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (id) {
          await updateSupervisionPharmacyById(id, {
            pharmacy_id: values.pharmacy_id ?? '', // ensure string
            supervision_date: values.supervision_date ?? '',
            supervision_time: values.supervision_time ?? '',
            status: values.status ?? ''
          });
          toast.success('Supervisión actualizada correctamente', {
            icon: <KeenIcon icon="check-circle" className="text-green-500" />
          });
        } else {
          await createSupervisionPharmacy({
            pharmacy_id: values.pharmacy_id ?? '',
            supervision_date: values.supervision_date ?? '',
            supervision_time: values.supervision_time ?? ''
          });
          toast.success('Supervisión creada correctamente', {
            icon: <KeenIcon icon="check-circle" className="text-green-500" />
          });
        }
        navigate('/supervision/list');
      } catch (error: any) {
        toast.error(error?.message || 'Error al guardar la supervisión');
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    fetchActivePharmacies().then(setPharmacy).catch(console.error);
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSupervisionPharmacyById(id)
      .then((data) => {
        // Formatear la fecha a YYYY-MM-DD si existe
        let formattedDate = '';
        if (data.supervision_date) {
          const d = new Date(data.supervision_date);
          if (!isNaN(d.getTime())) {
            formattedDate = d.toISOString().slice(0, 10);
          } else {
            formattedDate = data.supervision_date;
          }
        }
        formik.setValues({
          supervision_id: data.supervision_id ?? '',
          pharmacy_id: data.pharmacy_id ?? '',
          pharmacy_name: data.pharmacy_name ?? '',
          supervision_date: formattedDate,
          supervision_time: data.supervision_time ?? '',
          status: data.status ?? '',
          created_at: data.created_at ?? ''
        });
      })
      .catch((err) => {
        toast.error('Error al cargar la farmacia: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
      </div>
    );

  return (
    <div className="flex items-center justify-center w-full">
      <form className="card w-full max-w-3xl mx-auto" onSubmit={formik.handleSubmit} noValidate>
        <div className="card-header">
          <h3 className="card-title">{id ? 'Editar Farmacia' : 'Agendar supervisión'}</h3>
        </div>
        <div className="card-body grid gap-5">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pharmacy_id" className="form-label required">
                Farmacia
              </label>
              <select
                id="pharmacy_id"
                name="pharmacy_id"
                className="select"
                value={formik.values.pharmacy_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Seleccione una Farmacia</option>
                {supervisionPharmacy.map((c) => (
                  <option key={c.pharmacy_id} value={String(c.pharmacy_id)}>
                    {c.name}
                  </option>
                ))}
              </select>
              {formik.touched.pharmacy_id && formik.errors.pharmacy_id && (
                <div className="text-red-500 text-xs">{formik.errors.pharmacy_id}</div>
              )}
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="supervision_date" className="form-label required">
                  Fecha de supervisión
                </label>
                <input
                  type="date"
                  id="supervision_date"
                  name="supervision_date"
                  className="input"
                  placeholder="Fecha de supervisión"
                  value={formik.values.supervision_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.supervision_date && formik.errors.supervision_date && (
                  <div className="text-red-500 text-xs">{formik.errors.supervision_date}</div>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="supervision_time" className="form-label required">
                  Hora de supervisión
                </label>
                <input
                  type="time"
                  id="supervision_time"
                  name="supervision_time"
                  className="input"
                  placeholder="Hora de supervisión"
                  value={formik.values.supervision_time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.supervision_time && formik.errors.supervision_time && (
                  <div className="text-red-500 text-xs">{formik.errors.supervision_time}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2.5">
            <button
              type="button"
              className="btn btn-sm bg-gray-200 text-gray-600"
              onClick={() => navigate('/supervision/list')}
              disabled={formik.isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-greenA text-white"
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            >
              {formik.isSubmitting
                ? id
                  ? 'Guardando...'
                  : 'Guardando...'
                : id
                  ? 'Actualizar Agenda de Supervisión'
                  : 'Guardar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { SupervisionFormPage };
