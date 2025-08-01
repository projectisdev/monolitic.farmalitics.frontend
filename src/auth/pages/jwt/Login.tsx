import { type MouseEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';  
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import { useAuthContext } from '@/auth';
import { useLayout } from '@/providers';
import { Alert } from '@/components';
import axios from 'axios';

interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

interface FormikHelpers {
  setStatus: (status: string) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de correo incorrecto')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('La contraseña es obligatoria'),
  remember: Yup.boolean() 
});

const initialValues: LoginValues = {
  email: 'felsi.pe@pharmacy.com',
  password: 'Intec125@',
  remember: false
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();
  const { login } = useAuthContext();

  const onSubmit = async (values: LoginValues, { setStatus, setSubmitting }: FormikHelpers) => {
    setLoading(true);
    try {
      // const response = await axios.post<{ access_token: string }>('http://localhost:3000/api/auth/login', {
      //   email: values.email,
      //   password: values.password
      // });

      // Guardar el token en localStorage
      await login(values.email, values.password);
      // localStorage.setItem('token', response.data.access_token);
          if (values.remember) {
          localStorage.setItem('email', values.email);
        } else {
          localStorage.removeItem('email');
        }

      // Redirigir al usuario
      navigate(from, { replace: true });
    } catch (error) {
        setStatus('The login details are incorrect');
        setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit
  });

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        

       <h3 className="text-lg text-center font-semibold text-gray-900 leading-none mb-2.5">Iniciar Sesión</h3>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Correo electrónico</label>
          <label className="input">
            <input
              placeholder="Enter username"
              autoComplete="off"
              {...formik.getFieldProps('email')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.email && formik.errors.email
              })}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <label className="form-label text-gray-900">Contraseña</label>
          </div>
          
          <label className="input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.password && formik.errors.password
              })}
            />
            
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
              <KeenIcon
                icon="eye-slash"
                className={clsx('text-gray-500', { hidden: !showPassword })}
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.password}
            </span>
          )}
          <div className="flex justify-end mt-1">
            <Link
              to={
                currentLayout?.name === 'auth-branded'
                  ? '/auth/reset-password'
                  : '/auth/classic/reset-password'
              }
              className="text-2sm link shrink-0"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

        </div>
       
        <button
          type="submit"
          className="btn btn-primary flex justify-center grow"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Espere...' : 'Iniciar Sesión'}
        </button>

        <div className="text-center mb-2.5">
          <div className="flex items-center justify-center font-medium">
            <span className="text-2sm text-gray-600 me-1.5">¿Necesitas una cuenta?</span>
            <Link
              to={currentLayout?.name === 'auth-branded' ? '/auth/signup' : '/auth/classic/signup'}
              className="text-2sm link"
            >
              Registrarse
            </Link>
          </div>
        </div>

      </form>
    </div>
  );
};

export { Login };
