import type { Product } from '@/types';
import Router from 'next/router';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useModalAction } from '@/components/modal-views/context';
import routes from '@/config/routes';
import usePrice from '@/lib/hooks/use-price';
import { PreviewIcon } from '@/components/icons/preview-icon';
import { DetailsIcon } from '@/components/icons/details-icon';
import placeholder from '@/assets/images/placeholders/product.svg';
import { useGridSwitcher } from '@/components/product/grid-switcher';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { isFree } from '@/lib/is-free';
import { useTranslation } from 'next-i18next';
import { ExternalIcon } from '@/components/icons/external-icon';
import { ProductType, ShopType } from '@/types/product';

export default function Card({
  product,
  isShop,
}: {
  product: ProductType | ShopType;
  isShop?: boolean;
}) {
  const { isGridCompact } = useGridSwitcher();
  const goToContactUsPage = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    Router.push(
      isShop
        ? `/products/${(product as ShopType).uid}`
        : `/products/${(product as ProductType).uid ?? 2}?prd=${btoa(
            product.name,
          )}`,
    );
  };

  const { t } = useTranslation('common');

  return (
    <motion.div variants={fadeInBottomWithScaleX()} title={product.name}>
      <div
        className={cn(
          'group relative flex  w-full justify-center overflow-hidden',
          {
            'aspect-[3/2]': !isShop,
            'aspect-video': isShop,
          },
        )}
      >
        {/* {is_external ? (
          <div className="absolute right-2 top-2 z-10 rounded-md bg-dark-300/70 px-2 py-2 text-white">
            <ExternalIcon className="h-5 w-5" />
          </div>
        ) : null} */}
        <Image
          alt={product.name}
          fill
          quality={100}
          src={
            isShop
              ? (product as ShopType).cover_image ?? placeholder
              : (product as ProductType).image ?? placeholder
          }
          className="bg-light-500 object-cover dark:bg-dark-400"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <div
          onClick={goToContactUsPage}
          className="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
        >
          <button
            onClick={goToContactUsPage}
            className={cn(
              'relative z-[11] text-center font-medium text-light flex flex-col items-center gap-px',
              isGridCompact ? 'text-xs' : 'text-13px',
            )}
          >
            <div
              className={cn(
                'mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand',
                isGridCompact ? 'h-11 w-11' : 'h-[50px] w-[50px]',
              )}
            >
              <DetailsIcon
                className={cn(isGridCompact ? 'h-4 w-4' : 'h-5 w-5')}
              />
            </div>
            {isShop ? 'Enter Store' : 'Buy Product'}
          </button>
        </div>
      </div>
      <div
        className={cn('relative flex  justify-between pt-3.5', {
          'items-start': isShop,
          'items-center': !isShop,
        })}
      >
        <div
          className={cn({
            'p-1.5 rounded-full -translate-y-2/3 bg-dark-200 absolute z-20':
              isShop,
          })}
        >
          <div
            className={cn({
              'relative flex h-20 w-20 flex-shrink-0 overflow-hidden 4xl:h-24 4xl:w-24':
                isShop,
              'relative flex h-8 w-8 flex-shrink-0 overflow-hidden 4xl:h-9 4xl:w-9':
                !isShop,
            })}
          >
            <Image
              alt={
                isShop
                  ? (product as ShopType).name ?? ''
                  : (product as ProductType).shop?.name ?? ''
              }
              quality={100}
              fill
              src={
                isShop
                  ? (product as ShopType).logo ?? placeholder
                  : (product as ProductType).shop?.logo ?? placeholder
              }
              className="rounded-full bg-light-500 object-cover dark:bg-dark-400"
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </div>
        <div
          className={cn({
            '-mt-[4px] flex flex-col truncate ml-24': isShop,
            '-mt-[1px] flex items-center truncate ltr:mr-auto ltr:pl-2.5 rtl:ml-auto rtl:pr-2.5 rtl:text-right w-full':
              !isShop,
          })}
        >
          <h3
            title={product.name}
            className="mb-0.5 truncate font-medium text-dark-100 dark:text-light capitalize"
          >
            <AnchorLink href={routes.product(product.uid)}>
              {product.name}
            </AnchorLink>
          </h3>

          {!isShop ? (
            <div className="ml-auto flex flex-shrink-0 flex-col items-end pl-2.5">
              <span className="rounded-2xl bg-light-500 px-1.5 py-0.5 text-13px font-semibold uppercase text-brand dark:bg-dark-300 dark:text-brand-dark">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format((product as ProductType).price ?? 0)}
              </span>
            </div>
          ) : null}
          {/* <AnchorLink
            href={routes.shopUrl(shop?.slug)}
            className="font-medium text-light-base hover:text-brand dark:text-dark-800 dark:hover:text-brand"
          >
            {shop?.name}
          </AnchorLink> */}
        </div>

        {/* <div className="flex flex-shrink-0 flex-col items-end pl-2.5">
          <span className="rounded-2xl bg-light-500 px-1.5 py-0.5 text-13px font-semibold uppercase text-brand dark:bg-dark-300 dark:text-brand-dark">
            {isFreeItem ? t('text-free') : price}
          </span>
          {!isFreeItem && basePrice && (
            <del className="px-1 text-13px font-medium text-dark-900 dark:text-dark-700">
              {basePrice}
            </del>
          )}
        </div> */}
      </div>
    </motion.div>
  );
}
