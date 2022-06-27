import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { RegisterBgPattern } from '@/components/auth/register-bg-pattern';
import Image from '@/components/ui/image';
import { siteSettings } from '@/data/static/site-settings';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectAuth } from '../../store/authSlice';
import { SpinnerIcon } from '../icons/spinner-icon';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { setOpenShift } from '@/store/shiftInfoSlice';

export interface IFormValues {
  cashFlowAmount: number;
}

const validationSchema: yup.SchemaOf<IFormValues> = yup.object().shape({
  cashFlowAmount: yup.number().min(0, 'El monto debe ser mayor a 0').required(),
});

export default function OpenCashFlowForm() {
  const { verifiedUser } = siteSettings;

  const dispatch = useAppDispatch();
  const { username } = useAppSelector(selectAuth);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setLoading(null as any);
    };
  }, []);

  const initialValues: IFormValues = {
    cashFlowAmount: 0,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async ({ cashFlowAmount }: IFormValues) => {
    const setTimeoutPromise = (timeout: number) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    setLoading(true);
    await setTimeoutPromise(1000);
    dispatch(setOpenShift(cashFlowAmount));
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="grid min-h-full w-full place-content-center">
          <div className="flex items-center gap-3 text-lg">
            <SpinnerIcon className="h-auto w-6 animate-spin" /> Cargando...
          </div>
        </div>
      ) : (
        <div className="px-6 pt-10 pb-8 sm:px-8 lg:p-12">
          <RegisterBgPattern className="absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
          <div className="relative z-10 flex items-center">
            <div className="w-full shrink-0 text-left md:w-[380px]">
              <div className="pb-5 text-center">
                <Image
                  src={verifiedUser}
                  alt="user"
                  width="50px"
                  height="50px"
                  className="pb-1"
                />
                <h1 className="text-xs">{username}</h1>
              </div>
              <div className="pt-5 pb-1 text-center ">
                <h3 className="text-base font-medium tracking-[-0.3px] text-dark dark:text-light ">
                  Abrir Turno de Caja
                </h3>
              </div>
              <div
                className="rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-3 pb-5 text-teal-900 shadow-md"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="mr-4 h-6 w-6 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">
                      Para controlar el flujo de efectivo, cuenta el dinero en
                      tu cajón de efectivo y abre un turno de caja con el total
                      de efectivo disponible.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-5">
                  <Input
                    label="Efecito disponible en caja"
                    inputClassName="bg-light dark:bg-dark-300"
                    type="number"
                    {...register('cashFlowAmount')}
                    error={errors.cashFlowAmount?.message}
                  />
                </div>

                <Button
                  type="submit"
                  className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
                >
                  Seleccionar
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
