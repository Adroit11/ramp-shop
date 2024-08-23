// import Help from '@/components/authors/help';
import Accordion from '@/components/ui/accordion';
// import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
// import { useFAQs } from '@/data/faq';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HelpPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  // const { faqs, isLoading, error, loadMore, hasNextPage, isLoadingMore } =
  //   useFAQs({
  //     faq_type: 'global',
  //     issued_by: 'Super Admin',
  //     limit: 10,
  //     orderBy: 'created_at',
  //     sortedBy: 'DESC',
  //   });

  // if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <Seo
        title="Help"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.help}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-help-page-title')}
          subtitle={t('text-help-page-subtitle')}
        />
        <GeneralContainer>
          {/* <Help
            faqs={faqs}
            hasMore={Boolean(hasNextPage)}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
          /> */}
          {[
            {
              faq_title:
                'What are the delivery fees and minimum order requiremnts?',
              faq_description:
                'We aim to provide affordable and convenient online grocery shopping. Our delivery fees and minimum order requirements are as follows: The delivery fee may vary depending on your location and the time slot you choose. We strive to keep our delivery charges competitive and transparent. You can view the applicable fees during the checkout process. To place an order for delivery, we have a minimum order requirement. This requirement helps us cover the costs associated with packing and delivering your groceries. The minimum order amount may vary based on your location, but you can easily check the specific minimum for your area on our website or app. Please note that we may offer promotions and discounts from time to time, including waived delivery fees for orders over a certain amount. Keep an eye out for these special offers to save even more on your online grocery shopping.',
            },
            {
              faq_title:
                'How does the online ordering and delivery process work?',
              faq_description: `Ordering groceries online with us is simple and convenient. Here's a step-by-step guide to our process: Visit our website or mobile app to browse our wide selection of groceries. You can search for specific items or explore categories. Add the products you need to your virtual shopping cart. Before checkout, review your cart to ensure you have everything you need. You can also customize your order, specify quantities, and make any necessary adjustments. Proceed to the checkout page to review your order one last time. You can choose your preferred payment method, including credit/debit cards or digital wallets, and complete the transaction securely. Select your preferred delivery time slot. We offer flexible delivery options to accommodate your schedule. Once your order is placed, you will receive an order confirmation via email or SMS. You can track the status of your order through your account. Our dedicated delivery team will carefully pack your groceries and deliver them to your doorstep at the chosen time. You'll receive a notification when your order is out for delivery. Receive your groceries, unpack, and enjoy your fresh and quality products.`,
            },
            {
              faq_title: 'Do you accommodate special needs or allergies?',
              faq_description: `Yes, we strive to accommodate various dietary needs and allergies to ensure that everyone can enjoy our bakery products. Here's how we address specific dietary requirements: Each product on our website includes detailed information about allergens, such as nuts, dairy, eggs, and gluten. You can check these allergen labels to make informed choices. We offer a selection of products tailored to specific dietary preferences and restrictions. This may include gluten-free, vegan, or sugar-free options. You can easily filter products by dietary category on our website to find suitable choices. In some cases, we may be able to customize certain products to meet your specific dietary needs. If you have a special request or dietary requirement, please reach out to our customer support team, and we'll do our best to assist you.`,
            },
            {
              faq_title: 'What is the maximum order requiremnts?',
              faq_description:
                'We aim to provide affordable and convenient online grocery shopping. Our delivery fees and minimum order requirements are as follows: The delivery fee may vary depending on your location and the time slot you choose. We strive to keep our delivery charges competitive and transparent. You can view the applicable fees during the checkout process. To place an order for delivery, we have a minimum order requirement. This requirement helps us cover the costs associated with packing and delivering your groceries. The minimum order amount may vary based on your location, but you can easily check the specific minimum for your area on our website or app. Please note that we may offer promotions and discounts from time to time, including waived delivery fees for orders over a certain amount. Keep an eye out for these special offers to save even more on your online grocery shopping.',
            },
          ].map((item, idx) => (
            <Accordion key={idx} item={item} />
          ))}
        </GeneralContainer>
      </div>
    </>
  );
};

HelpPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default HelpPage;
