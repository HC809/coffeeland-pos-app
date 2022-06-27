import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { LoginUserInput } from '@/types';
import { Form } from '@/components/ui/forms/form';
import Password from '@/components/ui/forms/password';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { RegisterBgPattern } from '@/components/auth/register-bg-pattern';
import { siteSettings } from '@/data/static/site-settings';
import Image from '@/components/ui/image';
import { login } from '@/store/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IFormValues {
  username: string;
  password: string;
}

const validationSchema: yup.SchemaOf<IFormValues> = yup.object().shape({
  username: yup.string().email().required('Ingrese su usuario.'),
  password: yup.string().required('Ingrese su contraseña.'),
});

export default function LoginUserForm() {
  const { lightLogo } = siteSettings;

  const dispatch = useAppDispatch();

  const initialValues: IFormValues = {
    username: '',
    password: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async ({ username, password }: IFormValues) => {
    const user = {
      username: username,
      token: password,
    };

    dispatch(login(user));
  };

  return (
    <div className="px-6 pt-10 pb-8 sm:px-8 lg:p-12">
      <RegisterBgPattern className="absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="pb-5 text-center ">
            <Image
              src={lightLogo}
              alt="Logo"
              width="200px"
              height="150px"
              className="pb-5"
            />
          </div>
          <div className="pb-5 text-center ">
            <h1 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              Coffee Land POS
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 pt-4 lg:space-y-5"
          >
            <>
              <Input
                label="Usuario"
                inputClassName="bg-light dark:bg-dark-300"
                type="email"
                {...register('username')}
                error={errors.username?.message}
              />
              <Password
                label="Contraseña"
                inputClassName="bg-light dark:bg-dark-300"
                {...register('password')}
                error={errors.password?.message}
              />

              <Button
                type="submit"
                className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
              >
                Iniciar Sesión
              </Button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
