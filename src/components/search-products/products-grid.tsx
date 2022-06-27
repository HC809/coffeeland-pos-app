import { motion } from 'framer-motion';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import { IProduct } from '../../models/IProduct';
import ProductCard from './product-card';
import ItemNotFound from '../ui/item-not-found';

type CategoryGridProps = {
  products: IProduct[];
};

export default function ProductsGrid({ products }: CategoryGridProps) {
  return (
    <>
      {products?.length ? (
        <div className="w-full">
          <motion.div
            variants={staggerTransition(0.025)}
            className="grid grid-cols-2 gap-4 xs:grid-cols-[repeat(auto-fill,minmax(185px,1fr))] md:gap-5"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-4 md:p-6 xl:p-8">
          <div className="max-w-md text-center xl:max-w-lg">
            <ItemNotFound
              title="No se encontraron productos para esta categoria!"
              message="Comuniquese con el administrador o configure sus productos desde el panel de administración"
              className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
            />
          </div>
        </div>
      )}
    </>
  );
}
