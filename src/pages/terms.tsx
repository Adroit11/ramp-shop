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

const TermsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  // const {
  //   termsAndConditions,
  //   isLoading,
  //   error,
  //   loadMore,
  //   hasMore,
  //   isLoadingMore,
  // } = useTermsAndConditions({
  //   type: 'global',
  //   issued_by: 'Super Admin',
  //   limit: 10,
  //   is_approved: true,
  //   orderBy: 'created_at',
  //   sortedBy: 'DESC',
  // });

  // const getLastUpdateTermsDate = useMemo(() => {
  //   return (
  //     !isEmpty(termsAndConditions) &&
  //     isArray(termsAndConditions) &&
  //     termsAndConditions[0]?.created_at
  //   );
  // }, [termsAndConditions]);

  // if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <Seo title="Terms & Conditions" description="--" url={routes.terms} />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-terms-page-title')}
          subtitle={`Last updated on July 29, 2024`}
        />
        <GeneralContainer>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Introduction')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Welcome to Ramp. By using our platform, you agree to comply with and be bound by the following terms and conditions. These terms govern your access to and use of our services, including any content, functionality, and services offered on or through our website.`}
            </div>
          </div>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Account Registration and Responsibilities')}
            </h3>
            <div className="space-y-5 leading-6">
              {`To use Ramp, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other security breach.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Use of the Platform')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Ramp provides you with the tools to set up and manage your online store, process payments, and access financial reporting. You agree to use our platform solely for lawful purposes and in accordance with these Terms. You may not use our platform in any way that could damage, disable, or impair the services or interfere with any other party's use of the platform.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Payment Processing')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Ramp offers efficient payment processing services. By using these services, you agree to the terms of any third-party payment processors that we may use. You are responsible for ensuring that your transactions comply with all applicable laws and regulations`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Intellectual Property')}
            </h3>
            <div className="space-y-5 leading-6">
              {`All content on Ramp, including text, graphics, logos, images, and software, is the property of Ramp or its licensors and is protected by copyright and other intellectual property laws. You may not use any content from our platform without our prior written permission.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Termination')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We reserve the right to suspend or terminate your account and access to Ramp at any time, without notice, if we determine that you have violated these Terms of Service or any applicable law. Upon termination, your right to use the platform will immediately cease`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Limitation of Liability')}
            </h3>
            <div className="space-y-5 leading-6">
              {`Ramp will not be liable for any damages of any kind arising from your use of our platform, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Changes to the Terms')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on our website. Your continued use of Ramp after any such changes constitutes your acceptance of the new Terms.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Contact Information')}
            </h3>
            <div className="space-y-5 leading-6 mb-3">
              {`If you have any questions about these Terms, please contact us through our website's contact form or via email or phone number.`}
            </div>
            <div className="space-y-5 leading-6">
              {`Email Address: technology@joinramp.co 

`}
            </div>
            <div className="space-y-5 leading-6">
              {`
Phone Number: 02018891783
`}
            </div>
          </div>
        </GeneralContainer>
      </div>
    </>
  );
};

TermsPage.getLayout = function getLayout(page) {
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

export default TermsPage;
