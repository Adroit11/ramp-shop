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
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { useMutation } from 'react-query';
import { createOrderFn } from '@/services/products';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/helpers';

type SingleProps = {
  products: Product[];
};

// export function getPreviews(gallery: any[], image: any) {
//   if (!isEmpty(gallery) && Array.isArray(gallery)) return gallery;
//   if (!isEmpty(image)) return [image, {}];
//   return [{}, {}];
// }

const Single: React.FC<SingleProps> = ({ products }) => {
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
  // const previews = getPreviews(gallery, image);

  // console.log('heryyy', products);

  const shop = useMemo(() => {
    return products[0]?.shop;
  }, [products]);

  const orderMutation = useMutation({
    mutationFn: createOrderFn,
    onSuccess: () => {
      toast.success('Successful');
      setIsSubmitted(true);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <div className="relative">
      <div className="h-full min-h-screen p-4 md:px-6 lg:px-8 lg:pt-6">
        <div className="sticky top-0 z-20 flex items-center p-4 mb-1 -mx-4 -mt-2 bg-light-300 dark:bg-dark-100 sm:static sm:top-auto sm:z-0 sm:m-0 sm:mb-4 sm:bg-transparent sm:p-0 sm:dark:bg-transparent">
          <button
            onClick={() => router.push(routes?.home)}
            className="group inline-flex items-center gap-1.5 font-medium text-dark/70 hover:text-dark rtl:flex-row-reverse dark:text-light/70 hover:dark:text-light lg:mb-6"
          >
            <LongArrowIcon className="w-4 h-4" />
            {t('text-back')}
          </button>
        </div>

        <h2 className="mb-6 text-center text-xl md:text-2xl font-semibold tracking-tighter">{`${shop.name}'s Top Featured Products`}</h2>

        <p className="font-medium text-lg">Select one:</p>

        <div className="mt-4 mb-8">
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
                  'relative aspect-[3/2] border-2 border-transparent hover:border-pink-200 mb-10 transition duration-300 group',
                  {
                    ' border-pink-200': selectedItem === p.uid,
                  },
                )}
              >
                <Image
                  alt={p.name}
                  fill
                  quality={100}
                  src={(p.image as string) ?? placeholder}
                  className="object-cover bg-light-500 dark:bg-dark-300"
                />

                <p
                  className={classNames(
                    'absolute group-hover:text-pink-200 transition duration-300 z-10 capitalize -bottom-10 inset-x-0 font-medium text-center',

                    {
                      'text-pink-200': selectedItem === p.uid,
                    },
                  )}
                >
                  {p.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {selectedItem && !isSubmitted ? (
          <motion.div
            variants={fadeInBottom()}
            className="justify-center py-6 lg:flex lg:flex-col lg:py-10"
          >
            {/* <ProductDetailsPaper product={product[0]} className="lg:hidden" /> */}
            {/* <div className="lg:mx-auto 3xl:max-w-[1200px]">
            <div className="w-full rtl:space-x-reverse lg:flex lg:space-x-14 lg:pb-3 xl:space-x-20 3xl:space-x-28">
              <div className="hidden lg:block 3xl:max-w-[600px]">
                <div className="pb-5 leading-[1.9em] dark:text-light-600">
                  {description}
                </div>
                <ProductSocialShare
                  productSlug={slug}
                  className="pt-5 border-t border-light-500 dark:border-dark-400 md:pt-7"
                />
              </div>
              <ProductInformation
                tags={tags}
                created_at={created_at}
                updated_at={updated_at}
                layoutType={type?.name ?? 'new'}
                //@ts-ignore
                icon={type?.icon}
                className="flex-shrink-0 pb-6 pt-2.5 lg:min-w-[350px] lg:max-w-[470px] lg:pb-0"
              />
            </div>
            <div className="w-full mt-4 md:mt-8 md:space-y-10 lg:mt-12 lg:flex lg:flex-col lg:space-y-12">
              <AverageRatings
                ratingCount={rating_count}
                totalReviews={total_reviews}
                ratings={ratings}
              />
              <ProductReviews productId={id} />
              <ProductQuestions
                productId={product?.id}
                shopId={product?.shop?.id}
              />
            </div>
          </div> */}

            <form
              onSubmit={(e) => {
                e.preventDefault();

                orderMutation.mutate({
                  product_uid: selectedItem,
                  ...vals,
                });
              }}
            >
              <div className="w-full max-w-4xl mx-auto p-10 rounded-md border border-slate-300/20">
                <h3 className="mb-5 text-xl font-bold">Place Order Form</h3>
                <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                  <Input
                    label="Selected Product"
                    defaultValue={
                      products.find((p) => p.uid === selectedItem)?.name
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
                    className="px-12"
                    isLoading={orderMutation.isLoading}
                    disabled={orderMutation.isLoading}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : null}

        {isSubmitted ? (
          <p className="text-green-500 font-semibold w-full text-center">
            Order Created Successfully!
          </p>
        ) : null}
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
