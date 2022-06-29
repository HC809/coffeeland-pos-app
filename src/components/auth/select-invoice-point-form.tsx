import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { RegisterBgPattern } from '@/components/auth/register-bg-pattern';
import Image from '@/components/ui/image';
import { siteSettings } from '@/data/static/site-settings';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { selectAuth } from '../../store/authSlice';
import { SpinnerIcon } from '../icons/spinner-icon';
import { useEffect, useState } from 'react';
import ApiService from '@/api/principalService';
import { ApiGenericService } from '@/api/genericService';
import { IReactSelectOption } from '@/models/shared/IReactSelectOption';
import { IInvoicePoint } from '@/models/IInvoicePoint';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { TiWarning } from 'react-icons/ti';
import { setCategories } from '@/store/categoriesSlice';
import { setProducts } from '@/store/productsSlice';
import { setTaxInfo } from '@/store/taxInfoSlice';
import { setCompanyInfo } from '@/store/generalInfoSlice';

export interface IFormValues {
  invoicePointOption: IReactSelectOption;
}

const validationSchema: yup.SchemaOf<IFormValues> = yup.object().shape({
  invoicePointOption: yup.object().shape({
    label: yup.string().required(),
    value: yup
      .string()
      .min(1, 'Seleccione una opción')
      .required('Seleccione una opción'),
    extraData: yup.number().notRequired(),
  }),
});

export default function SelectInvoicePointForm() {
  const { verifiedUser } = siteSettings;

  const dispatch = useAppDispatch();

  const { username } = useAppSelector(selectAuth);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [invoicePointDataSelect, setInvoicePointDataSelect] = useState<
    IReactSelectOption[]
  >([]);

  useEffect(() => {
    (async () => {
      setLoadingData(true);
      try {
        const api = new ApiGenericService<IInvoicePoint>();
        const response = await api.getAll('invoice-points');

        if (response?.success) {
          const data = response?.data?.map((item) => {
            return {
              label: item.name,
              value: item.id,
            } as IReactSelectOption;
          });

          setInvoicePointDataSelect([...data]);
        }
      } finally {
        setLoadingData(false);
      }
    })();

    return () => {
      setLoading(null as any);
      setLoadingData(null as any);
      setInvoicePointDataSelect(null as any);
    };
  }, []);

  const onSubmit = async ({ invoicePointOption }: IFormValues) => {
    toast.remove();
    setLoading(true);

    try {
      const { data, success, message, errorMessage } =
        await ApiService.validateInvoicePoint(invoicePointOption.value);

      if (success) {
        const {
          generalInfo,
          invoicePoint,
          invoiceRangeInUse,
          invoiceRangePending,
          products,
          categories,
        } = data;

        if (!invoiceRangePending) {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? 'animate-enter' : 'animate-leave'
                } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
              >
                <div className="w-0 flex-1 bg-amber-200 p-4">
                  <div className="flex items-start">
                    <TiWarning width={500} height={500} />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {errorMessage}
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {`Tiene ${
                          invoiceRangeInUse.endNumber -
                          invoiceRangeInUse.startNumber +
                          1
                        } facturas disponibles.`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.remove(t.id)}
                    className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-yellow-600 hover:text-yellow-500 focus:outline-none focus:ring-yellow-500"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="flex border-l border-gray-200 bg-green-100">
                  <button
                    onClick={async () => {
                      toast.remove(t.id);
                      await dispatch(
                        setTaxInfo({
                          invoicePoint,
                          activeInvoiceRange: {
                            ...invoiceRangeInUse,
                            actualNumber: invoiceRangeInUse.startNumber,
                          },
                          pendingInvoiceRange: invoiceRangePending,
                        })
                      );
                      await dispatch(setCategories(categories));
                      await dispatch(setProducts(products));
                      await dispatch(setCompanyInfo(generalInfo));
                    }}
                    className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-green-600 hover:text-green-500 focus:ring-green-500"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ),
            { duration: 20000 }
          );
        } else {
          await dispatch(
            setTaxInfo({
              invoicePoint,
              activeInvoiceRange: {
                ...invoiceRangeInUse,
                actualNumber: invoiceRangeInUse.startNumber,
              },
              pendingInvoiceRange: invoiceRangePending,
            })
          );
          await dispatch(setCategories(categories));
          await dispatch(setProducts(products));
          await dispatch(setCompanyInfo(generalInfo));
        }
      } else {
        toast.error(<b>{errorMessage}</b>);
      }

      //dispatch(setInvoicePointId(values.invoicePointOption.value));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const initialValues: IFormValues = {
    invoicePointOption: { value: '', label: '' },
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const invoicePointOption = 'invoicePointOption';

  return (
    <>
      {loadingData ? (
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
                  Seleccionar Punto de Emisión
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Controller
                    name={invoicePointOption}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Seleccione una opción..."
                        isClearable
                        isSearchable={false}
                        options={invoicePointDataSelect}
                        isDisabled={loadingData}
                        isLoading={loadingData}
                      />
                    )}
                  />
                  <p className="my-2 text-center text-xs text-red-500">
                    {errors.invoicePointOption?.value?.message!}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerIcon className="h-auto w-6 animate-spin" />
                  ) : (
                    'Seleccionar'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
