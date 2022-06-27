import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { IProduct } from '../../models/IProduct';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addProductToNewOrder } from '@/store/newOrderSlice';
import usePrice from '@/lib/hooks/use-price';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: IProduct }) {
  const { name, image, sellingPrice } = product ?? {};

  const dispatch = useAppDispatch();

  const { price: itemPrice } = usePrice({
    amount: sellingPrice,
  });

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.05 }}
      variants={fadeInBottomWithScaleX()}
      onClick={() => {
        dispatch(
          addProductToNewOrder({
            productId: product.id,
            productName: product.name,
            image: product.image,
            categoryId: product.categoryId || 0,
            categoryName: product.category || '',
            taxId: product.taxRateId || 0,
            taxName: product.taxRate || '',
            sellingPrice: product.sellingPrice || 0,
            priceBeforeTax: product.priceBeforeTax || 0,
            quantity: 1,
            taxAmount: product.sellingPrice - product.priceBeforeTax,
            subtotal: product.priceBeforeTax,
            total: product.sellingPrice,
          })
        );
        toast.success(<b>Producto agregado al pedido!</b>);
      }}
      className="group cursor-pointer rounded-md bg-light px-4 py-7 text-center dark:bg-dark-250"
    >
      <div className="relative mx-auto mb-2.5 h-[75px] w-[75px] md:h-20 md:w-20 lg:h-[90px] lg:w-[90px]">
        <Image
          alt={name}
          layout="fill"
          quality={100}
          objectFit="cover"
          src={image ? `data:image/jpeg;base64,${image}` : placeholder}
          className="rounded-3xl"
        />
      </div>
      <h3 className="font-base  mb-1 text-lg text-dark transition-colors group-hover:text-brand dark:text-light">
        {name}
      </h3>
      <div className="text-sm font-medium text-green-700">{itemPrice}</div>
    </motion.div>
  );
}
