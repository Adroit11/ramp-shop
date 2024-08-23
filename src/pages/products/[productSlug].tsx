import Single from '@/components/product/single';
import ItemNotFound from '@/components/ui/item-not-found';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
// import { getStaticPaths, getStaticProps } from '@/data/ssr/products.ssr';
import Layout from '@/layouts/_layout';
import { getProductDetailFn } from '@/services/products';
import type { NextPageWithLayout } from '@/types';
import type { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
// export { getStaticPaths, getStaticProps };

const ProductPage = () => {
  const { query } = useRouter();
  const searchParams = useSearchParams();
  const [prd] = useState(searchParams.get('prd'));

  const shopDetailsQuery = useQuery(
    ['get_shop_details', query.productSlug],
    () => {
      return getProductDetailFn(query.productSlug as string);
    },
    { enabled: !prd },
  );

  const shopDetails = useMemo(() => {
    if (shopDetailsQuery.data?.data) {
      return shopDetailsQuery.data.data;
    }
    return [];
  }, [shopDetailsQuery.isLoading, shopDetailsQuery.data]);

  if (shopDetailsQuery.isLoading) {
    return (
      <div className="py-32">
        <PageLoader />
      </div>
    );
  }

  if (shopDetailsQuery.isError && !shopDetailsQuery.isLoading) {
    <div className="py-32">
      <ItemNotFound title="No help found 😔" message="" />
    </div>;
  }

  return <Single products={shopDetails} prd={prd} />;
};

ProductPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations('en', [
          'common',
          'form',
          'table',
          'widgets',
        ])),
      },
    };
  }
  return {
    props: {},
  };
};
export default ProductPage;
