import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import { siteSettings } from '@/data/static/site-settings';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectProductByCategoryId } from '@/store/productsSlice';
import { selectCategoryByName } from '@/store/categoriesSlice';
import ProductsGrid from '@/components/search-products/products-grid';

function CategoryProductsGrid({ categoryId }: { categoryId: number }) {
  const products = useAppSelector(selectProductByCategoryId(categoryId));
  return <ProductsGrid products={products} />;
}

const CategoryProductsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { categoryName } = router.query;

  const category = useAppSelector(selectCategoryByName(categoryName as string));

  const { coverImage } = siteSettings;
  return (
    <>
      <div className="relative w-full">
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            alt={category?.name}
            layout="fill"
            objectFit="cover"
            src={coverImage}
          />
        </div>
        <div className="relative z-10 h-full w-full bg-white/[0.85] px-4 pt-10 pb-16 text-center backdrop-blur-sm dark:bg-dark/[0.85] lg:px-8 lg:pt-5 lg:pb-5">
          <div className="relative mx-auto h-[75px] w-[75px] md:h-20 md:w-20 2xl:h-[90px] 2xl:w-[90px] 3xl:h-[100px] 3xl:w-[100px]">
            <Image
              alt={category?.name}
              layout="fill"
              objectFit="cover"
              quality={100}
              src={
                category?.image
                  ? `data:image/jpeg;base64,${category.image}`
                  : placeholder
              }
            />
          </div>
          <h1 className="mt-3 text-lg font-extrabold text-dark-100 2xl:mt-4">
            {category?.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-grow flex-col px-4 pt-6 pb-10 md:px-6 lg:px-7 lg:pb-12 3xl:px-8">
        <CategoryProductsGrid categoryId={category?.id || 0} />
      </div>
    </>
  );
};

CategoryProductsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CategoryProductsPage;
