import type { Product } from '@/types';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import Card from '@/components/product/card';
import ProductCardLoader from '@/components/product/product-loader';
import { useGridSwitcher } from '@/components/product/grid-switcher';
import ItemNotFound from '@/components/ui/item-not-found';
import rangeMap from '@/lib/range-map';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import { useTranslation } from 'next-i18next';
import { ProductType, ShopType } from '@/types/product';

interface GridProps {
  products: ProductType[] | ShopType[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  limit?: number;
  isHome?: boolean;
}

export default function Grid({
  products,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
  isHome,
  isLoading,
  limit = 15,
}: GridProps) {
  const { isGridCompact } = useGridSwitcher();
  const { t } = useTranslation('common');
  if (!isLoading && !products.length) {
    return (
      <ItemNotFound
        title={t('text-no-products-found')}
        message={t('text-no-products-found-message')}
        className="px-4 pb-10 pt-5 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
      />
    );
  }
  return (
    <div className="w-full px-4 pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8">
      {isHome ? (
        <h2 className="mb-7 mt-2 text-xl font-semibold">Explore Our Stores</h2>
      ) : null}

      <motion.div
        variants={staggerTransition(0.025)}
        className={cn(
          'grid grid-cols-1 gap-x-5 gap-y-10 xs:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:gap-x-6 3xl:gap-x-7',
          {
            '2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]':
              isGridCompact,
            '2xl:grid-cols-3 3xl:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] 4xl:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]':
              !isGridCompact,
          },
        )}
      >
        {isLoading && !products.length
          ? rangeMap(limit, (i) => (
              <ProductCardLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products.map((product) => (
              <Card key={product.id} product={product} isShop={isHome} />
            ))}
      </motion.div>

      {/* {hasNextPage && (
        <div className="mt-8 grid place-content-center md:mt-10">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            isLoading={isLoadingMore}
          >
            {t('text-loadmore')}
          </Button>
        </div>
      )} */}
    </div>
  );
}
