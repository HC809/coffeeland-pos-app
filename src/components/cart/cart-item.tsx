import usePrice from '@/lib/hooks/use-price';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import { IOrderDetail } from '../../models/INewOrder';
import Counter from '../ui/counter';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  decrementProductQuantityFromNewOrder,
  incremenetProductQuantityFromNewOrder,
} from '@/store/newOrderSlice';

export default function CartItem({
  item,
  notAvailable,
}: {
  item: IOrderDetail;
  notAvailable?: boolean;
}) {
  const { productName, productId, image } = item;

  const dispatch = useAppDispatch();

  const product = useAppSelector((state) =>
    state.newOrder.newOrderDetail.find((prod) => prod.productId === productId)
  );

  const { price: itemPrice } = usePrice({
    amount: product?.sellingPrice || 0,
  });

  const { price: total } = usePrice({
    amount: product?.total || 0,
  });

  const incremenetProductQuantity = () => {
    dispatch(incremenetProductQuantityFromNewOrder(product!));
  };

  const decrementProductQuantity = () => {
    dispatch(decrementProductQuantityFromNewOrder(product!));
  };

  return (
    <div className="flex w-full items-start gap-4 py-3">
      <div>
        <Counter
          value={product?.quantity || 0}
          onDecrement={decrementProductQuantity}
          onIncrement={incremenetProductQuantity}
        />
      </div>
      <div className="relative aspect-[5/3.4] w-28 flex-shrink-0 border border-light-300 bg-light-300 dark:border-0 dark:bg-dark-500 xs:w-32">
        <Image
          alt={productName}
          layout="fill"
          src={image ? `data:image/jpeg;base64,${image}` : placeholder}
          objectFit="contain"
        />
      </div>
      <div className="w-[calc(100%-125px)] text-13px font-medium xs:w-[calc(100%-145px)] sm:w-[calc(100%-150px)]">
        <span className="mb-1 inline-block rounded-2xl text-xs font-semibold text-green-800">
          {productName}
        </span>

        <p className="pt-2">
          <span className="rounded-2xl bg-light-300 p-1.5 font-semibold uppercase leading-none text-brand-dark dark:bg-dark-500">
            {total}
          </span>
        </p>

        <p className="flex items-center gap-1">
          <span className="rounded-2xl bg-light-300 p-1.5 font-semibold uppercase leading-none dark:bg-dark-500">
            {itemPrice}
          </span>

          <span className="text-light-base dark:text-dark-base">
            X {product?.quantity || 0}
          </span>
        </p>
      </div>
    </div>
  );
}
