import Button from '@/components/ui/button';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import LoginUserForm from '@/components/auth/login-form';
import SelectInvoicePointForm from '@/components/auth/select-invoice-point-form';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectAuth } from '../store/authSlice';
import { logout } from '@/store/authSlice';
import OpenCashFlowForm from '@/components/auth/open-cash-flow-form';
import { removeTaxInfo, selectTaxInfo } from '@/store/taxInfoSlice';
import { selectShiftInfo } from '@/store/shiftInfoSlice';

function UnAuthorizedView() {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden py-5 px-4 md:py-8">
      <div className="relative mx-auto w-full max-w-[445px] overflow-hidden rounded-lg bg-light pb-2 dark:bg-dark-300 lg:max-w-[478px] lg:pb-1">
        <LoginUserForm />
      </div>
    </div>
  );
}

function SelectInvoicePointView() {
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden py-5 px-4 md:py-8">
      <Button
        variant="icon"
        onClick={() => dispatch(logout())}
        className="sx:mb-10 left-4 z-10 mb-8 flex items-center justify-center sm:absolute sm:mb-0"
      >
        <LongArrowIcon className="h-4 w-4" /> Regresar
      </Button>
      <div className="relative mx-auto w-full max-w-[445px] overflow-hidden rounded-lg bg-light pb-2 dark:bg-dark-300 lg:max-w-[478px] lg:pb-1">
        <SelectInvoicePointForm />
      </div>
    </div>
  );
}

function OpenCashFlowView() {
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden py-5 px-4 md:py-8">
      <Button
        variant="icon"
        onClick={() => dispatch(removeTaxInfo())}
        className="sx:mb-10 left-4 z-10 mb-8 flex items-center justify-center sm:absolute sm:mb-0"
      >
        <LongArrowIcon className="h-4 w-4" /> Regresar
      </Button>
      <div className="relative mx-auto w-full max-w-[445px] overflow-hidden rounded-lg bg-light pb-2 dark:bg-dark-300 lg:max-w-[478px] lg:pb-1">
        <OpenCashFlowForm />
      </div>
    </div>
  );
}

export default function PrivateRoute({
  children,
}: React.PropsWithChildren<{}>) {
  const { logged } = useAppSelector(selectAuth);
  const { invoicePoint } = useAppSelector(selectTaxInfo);
  const { openShift } = useAppSelector(selectShiftInfo);

  if (!logged) {
    return <UnAuthorizedView />;
  }

  if (invoicePoint.id === 0 && invoicePoint.number === 0) {
    return <SelectInvoicePointView />;
  }

  if (!openShift) {
    return <OpenCashFlowView />;
  }

  return <>{children}</>;
}
