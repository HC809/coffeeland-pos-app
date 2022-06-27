import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import SearchProductsPage from './products-search';

export const getStaticProps: GetStaticProps = async () => {
  try {
    return {
      props: {
        //dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

const Home: NextPageWithLayout = () => {
  return (
    <>
      <SearchProductsPage />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
