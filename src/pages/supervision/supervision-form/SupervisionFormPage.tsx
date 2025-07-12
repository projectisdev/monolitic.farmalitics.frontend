import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { createPharmacy, updatePharmacyById, getPharmacyById } from '@/service/pharmacyService';
import { fetchCountries, fetchMunicipalities, fetchProvinces } from '@/service/locationService';
import { IPharmacy } from '../../../types/Pharmacy';
import { KeenIcon } from '@/components';

const pharmacySchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  legal_identity: Yup.string()
  .matches(/^[0-9]+$/, 'Solo se permiten números')
  .required('El RNC o cédula es obligatorio'),
  phone: Yup.string().required('El teléfono es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo electrónico es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  pharmacy_type: Yup.string().required('El tipo de farmacia es obligatorio'),
  country_id: Yup.string().required('El país es obligatorio'),
  province_id: Yup.string().required('La provincia es obligatoria'),
  municipality_id: Yup.string().required('El municipio es obligatorio'),
  number_of_employees: Yup.number()
    .typeError('Debe ser un número')
    .required('El número de empleados es obligatorio'),
  opening_date: Yup.date()
    .typeError('Debe ser una fecha válida')
    .required('La fecha de apertura es obligatoria'),
});

const SupervisionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [countries, setCountries] = useState<{ country_id: number; name: string }[]>([]);
  const [provinces, setProvinces] = useState<{ province_id: number; name: string }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ municipality_id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<IPharmacy>({
    enableReinitialize: true,
    initialValues: {
      pharmacy_id: 0,
      name: '',
      legal_identity: '',
      phone: '',
      email: '',
      country_id: '',
      province_id: '',
      municipality_id: '',
      address: '',
      pharmacy_type: '',
      number_of_employees: '',
      opening_date: '',
      status: 'Activa',
    },
    validationSchema: pharmacySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (id) {
          await updatePharmacyById(id, {
            name: values.name,
            legal_identity: values.legal_identity,
            phone: values.phone,
            email: values.email,
            country_id: Number(values.country_id),
            province_id: Number(values.province_id),
            municipality_id: Number(values.municipality_id),
            address: values.address,
            pharmacy_type: values.pharmacy_type,
            number_of_employees: values.number_of_employees,
            opening_date: values.opening_date,
            status: values.status,
          });
          toast.success('Farmacia actualizada correctamente', {
            icon: <KeenIcon icon="check-circle" className="text-green-500" />,
          });
        } else {
          await createPharmacy({
            name: values.name ?? '',
            legal_identity: values.legal_identity ?? '',
            phone: values.phone ?? '',
            email: values.email ?? '',
            country_id: Number(values.country_id),
            province_id: Number(values.province_id),
            municipality_id: Number(values.municipality_id),
            address: values.address ?? '',
            pharmacy_type: values.pharmacy_type ?? '',
            number_of_employees: values.number_of_employees ?? '',
            opening_date: values.opening_date ?? null,
            status: 'Activa',
          });
          toast.success('Farmacia creada correctamente', {
            icon: <KeenIcon icon="check-circle" className="text-green-500" />,
          });
        }
        navigate('/pharmacy/list');
      } catch (error: any) {
        toast.error(error?.message || 'Error al guardar la farmacia');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!formik.values.country_id) {
      setProvinces([]);
      setMunicipalities([]);
      formik.setFieldValue('province_id', '');
      formik.setFieldValue('municipality_id', '');
      return;
    }
    fetchProvinces(formik.values.country_id)
      .then(setProvinces)
      .catch(console.error);
    setMunicipalities([]);
    formik.setFieldValue('province_id', '');
    formik.setFieldValue('municipality_id', '');
  }, [formik.values.country_id]);

  useEffect(() => {
    if (!formik.values.province_id) {
      setMunicipalities([]);
      formik.setFieldValue('municipality_id', '');
      return;
    }
    fetchMunicipalities(formik.values.province_id)
      .then(setMunicipalities)
      .catch(console.error);
    formik.setFieldValue('municipality_id', '');
  }, [formik.values.province_id]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPharmacyById(id)
      .then((data) => {
        formik.setValues({
          pharmacy_id: data.pharmacy_id ?? 0,
          name: data.name ?? '',
          legal_identity: data.legal_identity ?? '',
          phone: data.phone ?? '',
          email: data.email ?? '',
          country_id: String(data.country_id ?? ''),
          province_id: String(data.province_id ?? ''),
          municipality_id: String(data.municipality_id ?? ''),
          address: data.address ?? '',
          pharmacy_type: data.pharmacy_type ?? '',
          number_of_employees: data.number_of_employees ?? '',
          opening_date: data.opening_date ? data.opening_date.split('T')[0] : '',
          status: data.status ?? 'Activa',
        });
      })
      .catch((err) => {
        toast.error('Error al cargar la farmacia: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando datos...</div>;

  return (
<div className="flex items-center justify-center w-full">
  <form
    className="card w-full max-w-3xl mx-auto" onSubmit={formik.handleSubmit} noValidate>
      <div className="card-header">
        <h3 className="card-title">{id ? 'Editar Farmacia' : 'Añadir Farmacia'}</h3>
      </div>
      <div className="card-body grid gap-5">

        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="name" className="form-label required">Nombre de Farmacia</label>
            <input
              id="name"
              type="text"
              className="input"
              autoComplete="off"
              placeholder='Escribir Nombre de Farmacia'
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="legal_identity" className="form-label required">RNC | Cédula</label>
            <input
              id="legal_identity"
              type="number"
              className="input"
              autoComplete="off"
              placeholder='Escribir RNC o Cédula'
              {...formik.getFieldProps('legal_identity')}
            />
            {formik.touched.legal_identity && formik.errors.legal_identity && (
              <div className="text-red-500 text-xs">{formik.errors.legal_identity}</div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="phone" className="form-label required">Teléfono</label>
            <input
              id="phone"
              type="tel"
              className="input"
              autoComplete="off"
              placeholder='Escribir Teléfono'
              pattern="[0-9]{10}"  
              maxLength={12}       
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-xs">{formik.errors.phone}</div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="email" className="form-label required">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              className="input"
              autoComplete="off"
              placeholder='Escribir Correo Electrónico'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-4">
         {/* País */}
<select
  id="country_id"
  className="select"
  {...formik.getFieldProps('country_id')}
>
  <option value="">Seleccione un país</option>
  {countries.map(c => (
    <option key={c.country_id} value={String(c.country_id)}>
      {c.name}
    </option>
  ))}
</select>

{/* Provincia */}
<select
  id="province_id"
  className="select"
  {...formik.getFieldProps('province_id')}
  disabled={!formik.values.country_id}
>
  <option value="">Seleccione una provincia</option>
  {provinces.map(p => (
    <option key={p.province_id} value={String(p.province_id)}>
      {p.name}
    </option>
  ))}
</select>

{/* Municipio */}
<select
  id="municipality_id"
  className="select"
  {...formik.getFieldProps('municipality_id')}
  disabled={!formik.values.province_id}
>
  <option value="">Seleccione un municipio</option>
  {municipalities.map(m => (
    <option key={m.municipality_id} value={String(m.municipality_id)}>
      {m.name}
    </option>
  ))}
</select>

        </div>

        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="address" className="form-label required">Dirección</label>
            <input
              id="address"
              type="text"
              className="input"
              autoComplete="off"
              placeholder='Escribir Dirección'
              {...formik.getFieldProps('address')}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-xs">{formik.errors.address}</div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="pharmacy_type" className="form-label required">Tipo de farmacia</label>
            <select
              id="pharmacy_type"
              className="select"
              {...formik.getFieldProps('pharmacy_type')}
            >
              <option value="">Seleccione un tipo</option>
              <option value="Retail">Retail</option>
              <option value="Hospitalaria">Hospitalaria</option>
            </select>
            {formik.touched.pharmacy_type && formik.errors.pharmacy_type && (
              <div className="text-red-500 text-xs">{formik.errors.pharmacy_type}</div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="number_of_employees" className="form-label required">Número de empleados</label>
            <input
              id="number_of_employees"
              type="number"
              min={1}
              className="input"
              {...formik.getFieldProps('number_of_employees')}
            />
            {formik.touched.number_of_employees && formik.errors.number_of_employees && (
              <div className="text-red-500 text-xs">{formik.errors.number_of_employees}</div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="opening_date" className="form-label required">Fecha de Apertura</label>
            <input
              id="opening_date"
              type="date"
              className="input"
              {...formik.getFieldProps('opening_date')}
            />
            {formik.touched.opening_date && formik.errors.opening_date && (
              <div className="text-red-500 text-xs">{formik.errors.opening_date}</div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="status" className="form-label required">Estado</label>
            <select
              id="status"
              className="select"
              {...formik.getFieldProps('status')}
            >
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-500 text-xs">{formik.errors.status}</div>
            )}
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
            {formik.isSubmitting ? (id ? 'Guardando...' : 'Guardando...') : (id ? 'Actualizar Farmacia' : 'Añadir Farmacia')}
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export { SupervisionFormPage };
