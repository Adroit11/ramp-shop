import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '@/types';
import { useMemo, useState } from 'react';
import Layout from '@/layouts/_layout';
import { usePopularProducts } from '@/data/product';
import Grid from '@/components/product/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import ButtonGroup from '@/components/ui/button-group';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { getProductsFn } from '@/services/products';
import { ProductType } from '@/types/product';
import { useCurrency } from '@/hooks/useCurrency';

const MAP_RANGE_FILTER = [
  {
    label: 'text-weekly',
    range: 7,
  },
  {
    label: 'text-monthly',
    range: 30,
  },
  {
    label: 'text-yearly',
    range: 365,
  },
];

function Products() {
  let [selected, setRange] = useState(MAP_RANGE_FILTER[2]);
  const { currencies, setRampCurrency, rampCurrency } = useCurrency();
  const productQuery = useQuery(['get_products', rampCurrency], () => {
    return getProductsFn(rampCurrency);
  });

  const products = useMemo(() => {
    if (productQuery.data?.data) {
      return productQuery.data.data as ProductType[];
    }
    return [];
  }, [productQuery.isLoading, productQuery.data]);
  const { t } = useTranslation('common');
  return (
    <>
      <div className="flex flex-col-reverse flex-wrap items-center justify-between px-4 pt-5 pb-4 xs:flex-row xs:space-x-4 md:px-6 md:pt-6 lg:px-7 3xl:px-8">
        <div className="pt-3 xs:pt-0">
          {t('text-total')} {products.length} {t('text-product-found')}
        </div>
        {/* <ButtonGroup
          items={MAP_RANGE_FILTER}
          selectedValue={selected}
          onChange={setRange}
        /> */}

        <div className="flex items-center gap-3">
          <select
            id="countries"
            className="h-11 w-full min-w-[120px] appearance-none rounded border border-light-500 bg-transparent dark:bg-dark-300 px-4 py-2 text-13px text-dark ring-[0.5px] ring-light-500 placeholder:text-dark-900 focus:border-brand focus:ring-[0.5px] focus:ring-brand dark:border-dark-600 dark:text-light dark:ring-dark-600 dark:placeholder:text-dark-700 dark:focus:border-brand dark:focus:ring-brand md:h-12 lg:px-5 xl:h-[50px]"
            onChange={(e) => {
              setRampCurrency(e.target.value);
            }}
            placeholder={rampCurrency}
          >
            {/* <option selected>{rampCurrency}</option> */}
            {currencies?.map((item) => (
              <option value={item.code} key={item.uid}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Grid
        products={products}
        hasNextPage={false}
        isLoadingMore={false}
        isLoading={productQuery.isLoading}
      />
    </>
  );
}

const PopularProductsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Top Products"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.popularProducts}
      />
      <Products />
    </>
  );
};

PopularProductsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default PopularProductsPage;
