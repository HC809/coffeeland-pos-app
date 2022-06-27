import cn from 'classnames';
import toast from 'react-hot-toast';
import { CloseIcon } from '@/components/icons/close-icon';
import CartItem from '@/components/cart/cart-item';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  removeProductFromNewOrder,
  selectNewOrder,
} from '@/store/newOrderSlice';

export default function CartItemList({ className }: { className?: string }) {
  const dispatch = useAppDispatch();

  const { newOrderDetail } = useAppSelector(selectNewOrder);

  function handleClearItemFromCart(productId: number) {
    dispatch(removeProductFromNewOrder(productId));
    toast.success(<b>Producto removido del pedido!</b>);
  }
  return (
    <ul role="list" className={cn('-my-6 w-full', className)}>
      {newOrderDetail.map((item) => {
        return (
          <li
            key={item.productId}
            className="relative ml-4 flex border-b border-light-300 last-of-type:border-b-0 dark:border-dark-500 xs:ml-6"
          >
            <button
              type="button"
              className="absolute -left-8 top-1/2 -mt-3.5 flex-shrink-0 p-2 font-medium text-dark-900 hover:text-dark dark:text-dark-800 dark:hover:text-light-900 xs:-left-10"
              onClick={() => handleClearItemFromCart(item.productId)}
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
            <CartItem item={item} notAvailable={!!false} />
          </li>
        );
      })}
    </ul>
  );
}
