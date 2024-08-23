import TermsAndCondition from '@/components/authors/terms';
import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useTermsAndConditions } from '@/data/terms-and-conditions';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import dayjs from 'dayjs';
import { isArray, isEmpty } from 'lodash';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';

const RefundPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Seo title="Refund Policy" url={routes.refund} />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('Refund Policy')}
          subtitle={`Last updated on July 29, 2024`}
        />
        <GeneralContainer>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Overview')}
            </h3>
            <div className="space-y-5 leading-6">
              {`At Ramp, we are committed to providing high-quality services to our users. However, we understand that there may be situations where a refund is necessary. This Refund Policy outlines the conditions under which refunds may be granted.`}
            </div>
          </div>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Eligibility for Refunds')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Refunds are only available for fees paid for services that were not delivered or were incorrectly delivered due to an error on our part. To be eligible for a refund, you must submit a request within 30 days of the transaction date.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Non-Refundable Services')}
            </h3>
            <div className="space-y-5 leading-6 mb-3">
              {`Certain services are non-refundable, including but not limited to:`}
            </div>
            <ol className="space-y-5 leading-6">
              <li>Fees paid for account setup or customization</li>
              <li>Fees for transactions that were successfully completed</li>
              <li>
                Charges related to third-party services integrated with Ramp
              </li>
            </ol>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Requesting a Refund')}
            </h3>
            <div className="space-y-5 leading-6">
              {`To request a refund, please contact our support team through our website with your account details and the reason for your request. We will review your request and, if it meets the eligibility criteria, process the refund within 7-10 business days.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Refund Process')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Approved refunds will be credited back to the original method of payment. Please note that it may take additional time for the refunded amount to appear on your statement, depending on your financial institution.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Changes to the Refund Policy')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We reserve the right to modify this Refund Policy at any time. Any changes will be posted on our website, and your continued use of Ramp signifies your acceptance of the updated policy.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Contact Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`If you have any questions about our Refund Policy, please contact us through our website's contact form.`}
            </div>
          </div>
        </GeneralContainer>
      </div>
    </>
  );
};

RefundPage.getLayout = function getLayout(page) {
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

export default RefundPage;
