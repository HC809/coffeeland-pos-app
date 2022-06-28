import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import CartItemList from '@/components/cart/cart-item-list';
import CartEmpty from '@/components/cart/cart-empty';
import usePrice from '@/lib/hooks/use-price';
import { useAppSelector } from '@/hooks/reduxHooks';
import {
  selectNewOrder,
  selectNewOrderDetailForInvoice,
} from '@/store/newOrderSlice';
import { useModalAction } from '../modal-views/context';
import { selectTaxInfo } from '../../store/taxInfoSlice';
import toast from 'react-hot-toast';
import { selectGeneralInfo } from '../../store/generalInfoSlice';
const { ipcRenderer } = window.require('electron');

interface InvoicePrintResponse {
  success: boolean;
  error: string;
  message: string;
}

function CartDrawerView() {
  const { openModal } = useModalAction();

  const { newOrderInfo, newOrderAmounts, newOrderDetail } =
    useAppSelector(selectNewOrder);

  const newOrderDetailForInvoce = useAppSelector(
    selectNewOrderDetailForInvoice
  );

  const { invoicePoint, activeInvoiceRange, pendingInvoiceRange } =
    useAppSelector(selectTaxInfo);

  const { companyInfo } = useAppSelector(selectGeneralInfo);

  useEffect(() => {
    return () => {};
  }, []);

  const validateTaxInfo = async () => {
    const {
      actualNumber: activeActualNumber,
      endNumber: activeEndNumber,
      limitDate: activeLimitDate,
    } = activeInvoiceRange;

    if (activeActualNumber < activeEndNumber) {
      if (activeLimitDate && activeLimitDate < new Date()) {
        toast.error(`La fecha límite de emisión fue el ${activeLimitDate}.`);
      } else {
        openModal('NEW_ORDER_VIEW');
      }
    } else {
      if (pendingInvoiceRange) {
        const {
          actualNumber: pendingActualNunber,
          endNumber: pendingEndNumber,
          limitDate: pendingLimitDate,
        } = pendingInvoiceRange;

        if (pendingActualNunber < pendingEndNumber) {
          if (pendingLimitDate && pendingLimitDate < new Date())
            toast.error(
              `La fecha límite de emisión fue el ${activeLimitDate}.`
            );
          else {
            openModal('NEW_ORDER_VIEW');
          }
        } else {
          toast.error('No tiene números de factura disponibles para facturar.');
        }
      } else {
        toast.error('No tiene números de factura disponibles para facturar.');
      }
    }
  };

  const {
    total,
    subtotal,
    totalExempt,
    totalExonerated,
    totalTax15,
    totalTax18,
  } = newOrderAmounts;

  const [loading, setLoading] = useState(false);

  const { price: totalAmount } = usePrice({
    amount: total,
  });

  const { price: subtotalAmount } = usePrice({
    amount: subtotal,
  });

  ipcRenderer.on('print-invoice-reply', (_event: any, arg: any) => {
    console.log(arg); // prints "pong" in the DevTools console
  });

  const handleCheckout = async () => {
    setLoading(true);

    const invoicePrintResponse: InvoicePrintResponse = await ipcRenderer.invoke(
      'print-invoice',
      {
        companyInfo,
        invoiceRange: activeInvoiceRange,
        newOrderInfo,
        newOrderAmounts,
        newOrderProductDetail: newOrderDetailForInvoce,
      }
    );

    setLoading(false);

    if (invoicePrintResponse.success) {
      alert(1);
    } else {
      toast.error(invoicePrintResponse.error, {
        position: 'bottom-center',
        duration: 5000,
      });
    }
  };
  return (
    <>
      <div className="flex h-[70px] items-center justify-between py-2 px-5 sm:px-7">
        <h2 className="text-sm font-medium capitalize text-dark dark:text-light">
          Pedido
        </h2>
      </div>
      {newOrderInfo.started ? (
        <Scrollbar className="cart-scrollbar w-full flex-1 py-6 px-6 sm:px-7">
          {newOrderDetail.length > 0 ? <CartItemList /> : <CartEmpty />}
        </Scrollbar>
      ) : (
        <Scrollbar className="cart-scrollbar w-full flex-1 py-6 px-6 sm:px-7">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mt-5 md:mt-8">
              <Button
                isLoading={loading}
                onClick={validateTaxInfo}
                className="w-full text-sm md:h-[52px]"
              >
                Nueva Venta
              </Button>
            </div>
          </div>
        </Scrollbar>
      )}

      <div className="border-t border-light-300 px-5 py-6 dark:border-dark-500 sm:px-7 sm:pb-8 sm:pt-7">
        <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Subtotal:</span>
          <span>{subtotalAmount}</span>
        </div>
        {/* <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Importe Exento:</span>
          <span>{totalExemptAmount}</span>
        </div>
        <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Importe Exonerado:</span>
          <span>{totalExoneratedAmount}</span>
        </div>
        <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Importe Gravado 15%:</span>
          <span>{totalTax15Amount}</span>
        </div>
        <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Importe Gravado 18%:</span>
          <span>{totalTax18Amount}</span>
        </div>
        <div className="flex justify-between pb-1 text-sm font-medium text-dark text-dark-800 dark:text-light">
          <span>Total Impuesto:</span>
          <span>{totalTaxAmount}</span>
        </div> */}
        <div className="flex justify-between text-sm font-medium text-dark dark:text-light">
          <span>Total:</span>
          <span>{totalAmount}</span>
        </div>
        <div className="mt-3 md:mt-5">
          <Button
            disabled={newOrderDetail.length === 0 || loading}
            isLoading={loading}
            onClick={() => handleCheckout()}
            className="w-full text-sm md:h-[52px]"
          >
            {!loading ? 'Facturar' : 'Imprimiendo Factura...'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CartDrawerView;
