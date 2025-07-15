import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { createMedicineType } from '@/service/medicineTypeService';
import { KeenIcon } from '@/components';

const riskOptions = ['Ninguno', 'Bajo', 'Medio', 'Alto'] as const;

const medicineSchema = Yup.object().shape({
    name: Yup.string().required('El nombre del tipo de medicina es obligatorio'),
    risk_level: Yup.mixed<'Ninguno' | 'Bajo' | 'Medio' | 'Alto'>()
        .oneOf(riskOptions, 'Seleccione un nivel de riesgo válido')
        .required('El nivel de riesgo es obligatorio'),
});

interface MedicineTypeModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

const MedicineTypeModal: React.FC<MedicineTypeModalProps> = ({ open, onClose, onCreated }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            risk_level: 'Ninguno' as 'Ninguno' | 'Bajo' | 'Medio' | 'Alto',
        },
        validationSchema: medicineSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
                await createMedicineType(values);
                toast.success('Tipo de medicina creado correctamente', {
                    icon: <KeenIcon icon="check-circle" className="text-green-500" />,
                });
                resetForm();
                onCreated?.();
                onClose();
            } catch (error: any) {
                toast.error(error?.message || 'Error al crear el tipo de medicina');
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4">
                <form className="card" onSubmit={formik.handleSubmit} noValidate>
                    <div className="card-header flex justify-between items-center border-b">
                        <h3 className="card-title">Crear Tipo de Medicina</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-700"
                            onClick={onClose}
                            disabled={formik.isSubmitting}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                    </div>
                    <div className="card-body grid gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="form-label required">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                className="input"
                                placeholder="Ej: Analgésico"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-xs">{formik.errors.name}</div>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="risk_level" className="form-label required">Nivel de Riesgo</label>
                            <select
                                id="risk_level"
                                className="select"
                                {...formik.getFieldProps('risk_level')}
                            >
                                {riskOptions.map((level) => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                            {formik.touched.risk_level && formik.errors.risk_level && (
                                <div className="text-red-500 text-xs">{formik.errors.risk_level}</div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-2.5">
                            <button
                                type="button"
                                className="btn btn-sm bg-gray-200 text-gray-600"
                                onClick={onClose}
                                disabled={formik.isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-greenA text-white"
                                disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Guardando...' : 'Crear Tipo'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicineTypeModal;
