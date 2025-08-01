import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/useAuthContext';
import { Alert, KeenIcon } from '@/components';
import { useLayout } from '@/providers';
import { AxiosError } from 'axios';

const initialValues = {
  email: ''
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de correo incorrecto')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('El correo es obligatorio')
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const { requestPasswordResetLink } = useAuthContext();
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      try {
        if (!requestPasswordResetLink) {
          throw new Error('JWTProvider es requerido para este formulario.');
        }
        await requestPasswordResetLink(values.email);
        setHasErrors(false);
        setLoading(false);
        const params = new URLSearchParams();
        params.append('email', values.email);
        navigate({
          pathname:
            currentLayout?.name === 'auth-branded'
              ? '/auth/reset-password/check-email'
              : '/auth/classic/reset-password/check-email',
          search: params.toString()
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setStatus(error.response.data.message);
        } else {
          setStatus('El restablecimiento de contraseña falló. Por favor, inténtalo de nuevo.');
        }
        setHasErrors(true);
        setLoading(false);
        setSubmitting(false);
      }
    }
  });
  return (
    <div className="card max-w-[370px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Correo Electrónico</h3>
          <span className="text-2sm text-gray-600 font-medium">
            Ingresa tu correo para restablecer la contraseña
          </span>
        </div>

        {hasErrors && <Alert variant="danger">{formik.status}</Alert>}

        {hasErrors === false && (
          <Alert variant="success">
            Enlace para restablecer la contraseña enviado. Por favor revisa tu correo para continuar
          </Alert>
        )}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Correo electrónico</label>
          <label className="input">
            <input
              type="email"
              placeholder="Ingresar correo electrónico"
              autoComplete="off"
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control bg-transparent',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email
                }
              )}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-5 items-stretch">
          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? 'Por favor espera...' : 'Continuar'}
          </button>

          <Link
            to={currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login'}
            className="flex items-center justify-center text-sm gap-2 text-gray-700 hover:text-primary"
          >
            <KeenIcon icon="black-left" />
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export { ResetPassword };
