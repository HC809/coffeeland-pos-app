import { motion } from 'framer-motion';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import { ICategory } from '../../models/ICategory';
import CategoryCard from './category-card';
import ShopCardLoader from '../shop/shop-loader';
import rangeMap from '@/lib/range-map';
import ItemNotFound from '../ui/item-not-found';

type CategoryGridProps = {
  categories: ICategory[];
  isLoading: boolean;
};

export default function CategoryGrid({
  categories,
  isLoading,
}: CategoryGridProps) {
  return (
    <>
      {categories?.length ? (
        <div className="w-full">
          <motion.div
            variants={staggerTransition(0.025)}
            className="grid grid-cols-2 gap-4 xs:grid-cols-[repeat(auto-fill,minmax(185px,1fr))] md:gap-5"
          >
            {isLoading
              ? rangeMap(5, (i) => (
                  <div className="rounded-md bg-light dark:bg-dark-250" key={i}>
                    <ShopCardLoader uniqueKey={`author-${i}`} />
                  </div>
                ))
              : categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
          </motion.div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-4 md:p-6 xl:p-8">
          <div className="max-w-md text-center xl:max-w-lg">
            <ItemNotFound
              title="No se encontraron productos!"
              message="Comuniquese con el administrador o configure sus productos desde el panel de administración"
              className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
            />
          </div>
        </div>
      )}
    </>
  );
}
