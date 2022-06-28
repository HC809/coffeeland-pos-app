import { setAuthUser } from '@/services/AuthenticationService';
import { selectShiftInfo } from '@/store/shiftInfoSlice';
import { selectTaxInfo } from '@/store/taxInfoSlice';
import { NextPageWithLayout } from '@/types';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectAuth } from '../store/authSlice';

const PrivateRoute = dynamic(() => import('@/layouts/_private-route'), {
  ssr: false,
});

interface Props {
  Component: NextPageWithLayout;
  pageProps: any;
}

const CustomRouter = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const auth = useAppSelector(selectAuth);
  const { invoicePoint } = useAppSelector(selectTaxInfo);
  const { openShift } = useAppSelector(selectShiftInfo);

  useEffect(() => {
    if (!auth) return;
    setAuthUser(auth);
  }, [auth]);

  return (
    <>
      {auth?.logged && invoicePoint.id !== 0 && openShift ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <PrivateRoute>{getLayout(<Component {...pageProps} />)}</PrivateRoute>
      )}
    </>
  );
};

export default CustomRouter;
