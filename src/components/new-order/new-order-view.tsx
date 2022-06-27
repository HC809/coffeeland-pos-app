import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { RegisterBgPattern } from '@/components/auth/register-bg-pattern';
import { siteSettings } from '@/data/static/site-settings';
import Image from '@/components/ui/image';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { useEffect, useState } from 'react';
import { OrderType } from '@/data/OrderTypes';
import { setNewOrderType, selectNewOrder } from '@/store/newOrderSlice';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useModalAction } from '../modal-views/context';

export interface IFormValues {
  ticketNumber: number;
  customerName?: string;
  rtn: string | null | undefined;
}

const validationSchema: yup.SchemaOf<IFormValues> = yup.object().shape({
  ticketNumber: yup
    .number()
    .min(0, 'El número de ticket no puede ser menor a 0.')
    .required(),
  customerName: yup.string(),
  rtn: yup
    .string()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .matches(
      /^([0-9]){4}[-]([0-9]){4}[-]([0-9]){6}$/,
      'Formato de RTN no válido.'
    )
    .nullable(true)
    .notRequired(),
});

export default function StartNewOrderForm() {
  const { eatHere, takeAway } = siteSettings;
  const { closeModal } = useModalAction();

  const dispatch = useAppDispatch();
  const { newOrderInfo } = useAppSelector(selectNewOrder);

  const [orderType, setOrderType] = useState<OrderType | null>(
    newOrderInfo.started ? newOrderInfo.orderType : null
  );

  useEffect(() => {
    return () => {
      setOrderType(null as any);
    };
  }, []);

  const initialValues: IFormValues = {
    ticketNumber: newOrderInfo.started ? newOrderInfo.ticketNumber || 0 : 0,
    customerName: newOrderInfo.started
      ? newOrderInfo.customerName
      : 'Consumidor Final',
    rtn: newOrderInfo.started ? newOrderInfo.rtn : null,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async ({ customerName, rtn, ticketNumber }: IFormValues) => {
    await dispatch(
      setNewOrderType({
        customerName: customerName || 'Consumidor Final',
        orderType: orderType!,
        rtn: rtn || '',
        ticketNumber: ticketNumber || 0,
      })
    );

    closeModal();
  };

  return (
    <div className="px-6 pt-5 pb-8 sm:px-8 lg:p-12">
      <RegisterBgPattern className="absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="pb-2 text-center ">
            <h1 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              {newOrderInfo.started ? 'Editar Venta' : 'Nueva Venta'}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <>
              <div className="grid h-full grid-cols-2 gap-5">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setOrderType(OrderType.SUC);
                  }}
                  className="group cursor-pointer rounded-md bg-light px-4 py-7 text-center dark:bg-dark-250"
                >
                  <div className="relative mx-auto mb-2.5 h-[75px] w-[75px] md:h-20 md:w-20 lg:h-[90px] lg:w-[90px]">
                    <Image
                      alt={'eat-here'}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={eatHere}
                      className="rounded-3xl"
                    />
                  </div>

                  <h3
                    className={`${
                      orderType !== OrderType.SUC
                        ? 'font-base mb-1 text-gray-300 transition-colors group-hover:text-brand dark:text-light'
                        : 'font-base mb-1 text-lg text-brand'
                    }`}
                  >
                    {'En Sucursal'}
                  </h3>
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  variants={fadeInBottomWithScaleX()}
                  onClick={() => {
                    setOrderType(OrderType.AS);
                  }}
                  className="group cursor-pointer rounded-md bg-light px-4 py-7 text-center dark:bg-dark-250"
                >
                  <div className="relative mx-auto mb-2.5 h-[75px] w-[75px] md:h-20 md:w-20 lg:h-[90px] lg:w-[90px]">
                    <Image
                      alt={'eat-here'}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={takeAway}
                      className="rounded-3xl"
                    />
                  </div>

                  <h3
                    className={`${
                      orderType !== OrderType.AS
                        ? 'font-base mb-1 text-gray-300 transition-colors group-hover:text-brand dark:text-light'
                        : 'font-base mb-1 text-lg text-brand'
                    }`}
                  >
                    {'Autoservicio'}
                  </h3>
                </motion.div>
              </div>

              <Input
                label="Ticket"
                inputClassName="bg-light dark:bg-dark-300"
                {...register('ticketNumber')}
                error={errors.ticketNumber?.message}
              />
              <Input
                label="Cliente"
                inputClassName="bg-light dark:bg-dark-300"
                {...register('customerName')}
                error={errors.customerName?.message}
              />
              <Input
                label="RTN"
                inputClassName="bg-light dark:bg-dark-300"
                {...register('rtn')}
                error={errors.rtn?.message}
              />

              <Button
                type="submit"
                className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
                disabled={!orderType}
              >
                {newOrderInfo.started ? 'Guardar' : 'Iniciar'}
              </Button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
