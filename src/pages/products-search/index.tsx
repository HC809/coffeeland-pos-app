import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import CategoryGrid from '../../components/search-products/categories-grid';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectCategories } from '@/store/categoriesSlice';
import { selectNewOrder } from '../../store/newOrderSlice';
import { siteSettings } from '@/data/static/site-settings';
import Image from '@/components/ui/image';

const SearchProductsPage: NextPageWithLayout = () => {
  const { lightLogo } = siteSettings;

  const { newOrderInfo } = useAppSelector(selectNewOrder);
  const { categories } = useAppSelector(selectCategories);

  return (
    <>
      {newOrderInfo?.started ? (
        <div className="flex flex-grow flex-col px-4 pt-6 pb-10 md:px-6 lg:px-7 lg:pb-12 3xl:px-8">
          <CategoryGrid categories={categories} isLoading={false} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-4 md:p-6 xl:p-8">
          <div className="max-w-md text-center xl:max-w-lg">
            <Image src={lightLogo} width={200} height={150} alt="logo" />
          </div>
        </div>
      )}
    </>
  );
};

SearchProductsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SearchProductsPage;
