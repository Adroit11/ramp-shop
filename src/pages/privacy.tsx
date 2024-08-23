import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from '@/types';
import GeneralLayout from '@/layouts/_general-layout';
import PageHeading from '@/components/ui/page-heading';
import GeneralContainer from '@/layouts/_general-container';
import { privacyPolicy } from '@/data/static/privacy-setting';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
const PrivacyPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo title="Privacy Policy" description="--" url={routes.privacy} />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-privacy-page-title')}
          // subtitle={t('text-privacy-page-subtitle')}
        />
        <GeneralContainer>
          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Introduction')}
            </h3>
            <div className="space-y-5 leading-6">
              {`At Ramp, we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Information We Collect')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We may collect personal information that you provide directly to us, such as your name, email address, phone number, and payment details. We also collect information automatically when you use our platform, such as your IP address, browser type, and usage data.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('How We Use Your Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We use your information to provide and improve our services, process transactions, communicate with you, and comply with legal obligations. Your information helps us ensure a smooth and secure experience on Ramp.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Sharing Your Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted partners who assist us in operating our platform, conducting our business, or serving you, as long as those parties agree to keep this information confidential.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Data Security')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Your Rights')}
            </h3>
            <div className="space-y-5 leading-6">
              {`You have the right to access, correct, or delete your personal information at any time. You may also object to or restrict our processing of your data in certain circumstances. To exercise these rights, please contact us through our website.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Cookies')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We use cookies to enhance your experience on Ramp. Cookies are small files that are stored on your device and help us remember your preferences and improve our services. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our platform.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Changes to the Privacy Policy')}
            </h3>
            <div className="space-y-5 leading-6">
              {`We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated policy on our website. Your continued use of Ramp after any changes signifies your acceptance of the new policy.`}
            </div>
          </div>

          <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
              {t('Contact Information')}
            </h3>
            <div className="space-y-5 leading-6">
              {`If you have any questions about our Privacy Policy, please contact us through our website's contact form.`}
            </div>
          </div>
        </GeneralContainer>
      </div>
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page) {
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

export default PrivacyPage;
