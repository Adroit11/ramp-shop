import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import placeholder from '@/assets/images/placeholders/product.svg';
import { motion } from 'framer-motion';
import ProductDetailsPaper from '@/components/product/product-details-paper';
import ProductInformation from '@/components/product/product-information';
import ProductSocialShare from '@/components/product/product-social-share';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/review/average-ratings';
import ProductReviews from '@/components/review/product-reviews';
import Image from '@/components/ui/image';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import routes from '@/config/routes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  fadeInBottom,
  fadeInBottomWithScaleX,
  fadeInBottomWithScaleY,
} from '@/lib/framer-motion/fade-in-bottom';
import { Product } from '@/types';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { useMutation } from 'react-query';
import { createOrderFn } from '@/services/products';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/helpers';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { ExternalIcon } from '@/components/icons/external-icon';
import Badge from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

type SingleProps = {
  products: Product[];
  prd?: string | null;
};

// export function getPreviews(gallery: any[], image: any) {
//   if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
//   if (!isEmpty(image)) return [image, {}];
//   return [{}, {}];
// }

const Single: React.FC<SingleProps> = ({ products, prd }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState('');
  const [vals, setVals] = useState({
    quantity: 1,
    note: '',
    shipping_address: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { width, height } = useWindowSize();
  // const timer = useRef<any>(null);
  // const [showConfetti, setShowConfetti] = useState(false);
  // const previews = getPreviews(gallery, image);

  // console.log('heryyy', products);

  const shop = useMemo(() => {
    if (products && products.length) return products[0]?.shop;

    return null;
  }, [products]);

  const formatPrice = (p: number) => {
    const amt = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(p ?? 0);

    return amt;
  };

  const orderMutation = useMutation({
    mutationFn: createOrderFn,
    onSuccess: () => {
      // toast.success('Successful');
      setIsSubmitted(true);
      // setShowConfetti(true);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  // useEffect(() => {
  //   if (showConfetti) {
  //     timer.current = setTimeout(() => {
  //       setShowConfetti(false);
  //     }, 8000);
  //   }

  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, [showConfetti]);

  return (
    <div className="relative">
      <div className="h-full min-h-screen p-4 md:px-6 lg:px-8 lg:pt-6">
        {!isSubmitted ? (
          <>
            <div className="sticky top-0 z-20 flex items-center p-4 mb-1 -mx-4 -mt-2 bg-light-300 dark:bg-dark-100 sm:static sm:top-auto sm:z-0 sm:m-0 sm:mb-4 sm:bg-transparent sm:p-0 sm:dark:bg-transparent">
              <button
                onClick={() => router.push(routes?.home)}
                className="group inline-flex items-center gap-1.5 font-medium text-dark/70 hover:text-dark rtl:flex-row-reverse dark:text-light/70 hover:dark:text-light lg:mb-6"
              >
                <LongArrowIcon className="w-4 h-4" />
                {t('text-back')}
              </button>
            </div>

            {!prd ? (
              <>
                <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex gap-2 items-center justify-start">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tighter capitalize">
                      {shop?.name ?? ''}
                    </h2>
                  </div>
                </div>

                <div className="p-5 pt-7 border border-slate-500/20 rounded-lg">
                  <h2 className="font-medium text-base mb-7">
                    Select a product:
                  </h2>

                  <div className="mb-10">
                    <motion.div
                      variants={staggerTransition()}
                      className=" grid gap-4 sm:grid-cols-3 lg:gap-6"
                    >
                      {products?.map((p, idx) => (
                        <motion.div
                          key={idx}
                          role={'button'}
                          tabIndex={0}
                          onClick={() => {
                            setSelectedItem(p.uid);
                            setIsSubmitted(false);
                          }}
                          variants={fadeInBottomWithScaleX()}
                          className={classNames(
                            'dark:bg-dark-200 rounded-lg group border-2 hover:border-brand  transition duration-300 ',
                            {
                              '!border-brand': selectedItem === p.uid,
                              'border-transparent': selectedItem !== p.uid,
                            },
                          )}
                        >
                          <div className="p-3">
                            <div className="relative aspect-[3/2] mb-3">
                              <Image
                                alt={p.name}
                                fill
                                quality={100}
                                src={(p.image as string) ?? placeholder}
                                className="object-cover bg-light-500 dark:bg-dark-300"
                              />
                            </div>

                            <div className="w-full flex justify-between items-center gap-3">
                              <h4
                                className={classNames(
                                  ' group-hover:text-brand transition duration-300 z-10 capitalize font-semibold text-center',
                                  {
                                    'text-brand': selectedItem === p.uid,
                                  },
                                )}
                              >
                                {p.name}
                              </h4>

                              <div className="flex flex-shrink-0 flex-col items-end pl-2.5">
                                <span className="rounded-2xl bg-light-500 px-2.5 py-0.5 text-13px font-semibold uppercase text-black dark:bg-dark-300 dark:text-brand-dark">
                                  {formatPrice(p.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {shop?.shop_website_link ? (
                    <div className="flex justify-center items-center">
                      <a href={shop.shop_website_link} target="_blank">
                        <Button className="gap-2 !px-20">
                          View More <ExternalIcon width={18} />
                        </Button>
                      </a>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {selectedItem || prd ? (
              <motion.div
                variants={fadeInBottom()}
                className="justify-center py-6 lg:flex lg:flex-col lg:py-10"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    orderMutation.mutate({
                      product_uid: prd
                        ? (router.query.productSlug! as string)
                        : selectedItem,
                      ...vals,
                    });
                  }}
                >
                  <div className="w-full max-w-4xl mx-auto px-10 py-14 rounded-md  md:bg-light md:px-10 md:shadow-card md:dark:bg-dark-200 md:dark:shadow-none">
                    <h3 className="mb-5 text-xl font-bold">Place Order Form</h3>
                    <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                      <Input
                        label="Selected Product"
                        defaultValue={
                          prd
                            ? atob(prd)
                            : products.find((p) => p.uid === selectedItem)?.name
                        }
                        disabled
                      />
                      <Input
                        label="Quantity (min 1)"
                        type="number"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            // @ts-ignore
                            quantity: e.target.value as number,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Customer Name"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            customer_name: e.target.value,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Customer Email"
                        type="email"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            customer_email: e.target.value,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Customer Phone"
                        type="tel"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            customer_phone: e.target.value,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Customer Address"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            customer_address: e.target.value,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Shipping Address"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            shipping_address: e.target.value,
                          }));
                        }}
                        required
                      />
                      <Input
                        label="Note"
                        onChange={(e) => {
                          setVals((prev) => ({
                            ...prev,
                            note: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="!px-10"
                        isLoading={orderMutation.isLoading}
                        disabled={orderMutation.isLoading}
                      >
                        Continue to Checkout
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : null}
          </>
        ) : (
          <div>
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-5">
              <h2 className="mb-8 text-lg lg:text-2xl text-center font-semibold">
                Continue to payment gateway
              </h2>
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-light shadow-card dark:bg-dark-400 md:h-[120px] md:w-[120px] 3xl:h-32 3xl:w-32">
                <svg
                  className="h-12 w-12 text-brand-dark md:h-16 md:w-16"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke-width="2"
                    d="M2.99787498,0.999999992 L17.4999998,0.999999992 L20.9999998,4.50000005 L21,23 L3,23 L2.99787498,0.999999992 Z M16,1 L16,6 L21,6 M9,12 L15,18 M15,12 L9,18"
                  ></path>
                </svg>
              </div>
              <h2 className="mb-2.5 text-15px font-semibold text-dark-300 dark:text-light md:text-base 3xl:text-lg">
                {t('Under construction')}
              </h2>
              <p className="text-center">
                {t('No payment gateway integrated')}
              </p>

              {/* <Button
              className="my-6 w-40"
              onClick={() => {
                router.push('/');
              }}
            >
              Return Home
            </Button> */}

              {/* {showConfetti ? (
      <ReactConfetti width={width} height={height} />
    ) : null} */}
            </div>
          </div>
        )}
      </div>
      {/* <motion.div
        variants={fadeInBottomWithScaleY()}
        className="sticky bottom-0 right-0 z-10 hidden h-[100px] w-full border-t border-light-500 bg-light-100 px-8 py-5 dark:border-dark-400 dark:bg-dark-200 lg:flex 3xl:h-[120px]"
      >
        {/* <ProductDetailsPaper product={product} /> 
      </motion.div> */}
    </div>
  );
};

export default Single;
